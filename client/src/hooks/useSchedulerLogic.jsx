import { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import Tooltip from 'devextreme-react/tooltip';
import Scheduler from 'devextreme-react/scheduler';
import DataSource from 'devextreme/data/data_source';
import { useScreenSize } from '../utils/media-query';
import { findAllAppointmentsForDay } from './utils';
import { baseUrl } from '../utils/service';

export const useSchedulerLogic = () => {
  const { isXSmall, isLarge } = useScreenSize();
  const tooltipRef = useRef(null);
  const schedulerRef = useRef(null);

  const [agendaItems, setAgendaItems] = useState([]);
  const [currentView, setCurrentView] = useState('workWeek');
  const [date, setDate] = useState(new Date());
  const [schedulerCurrentDate, setSchedulerCurrentDate] = useState(new Date());
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch( `${baseUrl}/resevations`); // Endpoint de votre API backend
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const tasksList = await response.json();
        setTasks(new DataSource(tasksList));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks) {
      setAgendaItems(findAllAppointmentsForDay({ startDate: date }, tasks));
    }
  }, [tasks, date]);

  const tooltipPosition = useMemo(() => {
    if (isXSmall) {
      return 'bottom';
    }
    const classList = selectedAppointment?.target?.classList || selectedAppointment?.target?.[0]?.classList;
    return classList?.contains('dx-list') && rightPanelOpen ? 'left' : 'top';
  }, [selectedAppointment, rightPanelOpen, isXSmall]);

  const toggleRightPanelOpen = useCallback(() => {
    setRightPanelOpen(prevState => !prevState);
    if (isLarge) {
      schedulerRef.current?.instance.repaint();
    }
  }, [isLarge]);

  const onCurrentViewChange = useCallback((view) => {
    if (view === 'month' && !isXSmall) {
      setRightPanelOpen(true);
    }
    if (currentView === 'month' && view !== 'month') {
      setRightPanelOpen(false);
    }
    setCurrentView(view);
  }, [isXSmall, currentView]);

  const showAppointmentCreationForm = useCallback(() => {
    schedulerRef.current?.instance.showAppointmentPopup();
  }, []);

  const deleteCurrentAppointment = useCallback(() => {
    schedulerRef.current?.instance.deleteAppointment(selectedAppointment?.data);
    tooltipRef.current?.instance.hide();
  }, [selectedAppointment]);

  const editCurrentAppointment = useCallback(() => {
    schedulerRef.current?.instance.showAppointmentPopup(selectedAppointment?.data, false);
    tooltipRef.current?.instance.hide();
  }, [selectedAppointment]);

  const updateAgenda = useCallback((appointmentData) => {
    setAgendaItems(findAllAppointmentsForDay(appointmentData, tasks));
  }, [tasks]);

  const onAppointmentClick = useCallback((e) => {
    if (currentView === 'month' && !rightPanelOpen) {
      const appointmentData = e.appointmentData;
      setSelectedAppointment({ data: appointmentData, target: e.targetElement });
      updateAgenda(appointmentData);
      toggleRightPanelOpen();
    }
  }, [currentView, rightPanelOpen, updateAgenda, toggleRightPanelOpen]);

  const onAppointmentTooltipShowing = useCallback((e) => {
    e.cancel = true;
    const appointmentData = e.appointments[0].appointmentData;

    const isAppointmentCollectorClicked = (e) => {
      return e.targetElement?.[0]?.classList.contains('dx-scheduler-appointment-collector');
    };

    setSelectedAppointment({ data: appointmentData, target: e.targetElement });

    if (currentView === 'month' || isAppointmentCollectorClicked(e)) {
      updateAgenda(appointmentData);
    }
    if ((currentView === 'month' && isXSmall || isAppointmentCollectorClicked(e)) && !rightPanelOpen) {
      toggleRightPanelOpen();
    } else {
      tooltipRef.current?.instance.show();
    }
  }, [currentView, isXSmall, rightPanelOpen, updateAgenda, toggleRightPanelOpen]);

  const onSelectedCalendarsChange = useCallback((selectedCalendars) => {
    const removedResourceFilters = selectedCalendars.map((calendar) => calendar.id);

    // Exemple de manipulation des tâches (filtrage, chargement, etc.)
    const updatedTasks = tasks?.filter((task) => {
      return !removedResourceFilters.includes(task.calendarId);
    });

    setTasks(new DataSource(updatedTasks));
    updateAgenda(selectedAppointment?.data);
  }, [tasks, selectedAppointment, updateAgenda]);

  const setCurrentDate = useCallback((selectedDate) => {
    const schedulerInstance = schedulerRef.current?.instance;
    const startViewDate = schedulerInstance?.getStartViewDate();
    const endViewDate = schedulerInstance?.getEndViewDate();

    if (schedulerCurrentDate.getMonth() !== selectedDate.getMonth() ||
      (startViewDate && startViewDate > selectedDate) ||
      (endViewDate && endViewDate < selectedDate)) {
      setSchedulerCurrentDate(selectedDate);
    }
    setDate(selectedDate);
  }, [schedulerCurrentDate]);

  const onSelectedDateChange = useCallback((e) => {
    const selectedDate = e instanceof Date ? e : new Date();
    setDate(selectedDate);
    setCurrentDate(selectedDate);
    setSelectedAppointment({ data: { startDate: selectedDate }, target: undefined });
    updateAgenda({ startDate: selectedDate });
  }, [setCurrentDate, updateAgenda]);

  const onAppointmentModified = useCallback((e) => {
    if (e.appointmentData.startDate.toDateString() === selectedAppointment?.data.startDate.toDateString()) {
      updateAgenda(e.appointmentData);
    }
  }, [selectedAppointment, updateAgenda]);

  const showAppointmentTooltip = useCallback((e) => {
    schedulerRef.current?.instance.showAppointmentTooltip(e.itemData, e.element);
  }, []);

  const onCellClick = useCallback((e) => {
    onSelectedDateChange(e.cellData.startDate);
    if (currentView === 'month' && e.cellData) {
      const cellAppointments = findAllAppointmentsForDay(e.cellData, tasks);
      if (cellAppointments.length > 1) {
        setSelectedAppointment({ data: e.cellData, target: null });
        setAgendaItems(cellAppointments);
        if (!rightPanelOpen) {
          toggleRightPanelOpen();
        }
      }
    }
  }, [currentView, rightPanelOpen, tasks, toggleRightPanelOpen, onSelectedDateChange]);

  return {
    agendaItems,
    currentView,
    date,
    rightPanelOpen,
    schedulerRef,
    schedulerCurrentDate,
    selectedAppointment,
    tasks,
    tooltipPosition,
    tooltipRef,
    showAppointmentCreationForm,
    deleteCurrentAppointment,
    editCurrentAppointment,
    onCurrentViewChange,
    onAppointmentClick,
    onAppointmentTooltipShowing,
    onAppointmentModified,
    onCellClick,
    onSelectedDateChange,
    onSelectedCalendarsChange,
    showAppointmentTooltip,
    toggleRightPanelOpen,
  };
};
