<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240625085901 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE "appuser_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE brand_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE institute_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE opinion_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE performance_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE planning_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE reservation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE review_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE service_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE slot_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE sport_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE "appuser" (id INT NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, firstname VARCHAR(255) DEFAULT NULL, lastname VARCHAR(255) DEFAULT NULL, username VARCHAR(255) NOT NULL, phone VARCHAR(20) DEFAULT NULL, address VARCHAR(255) DEFAULT NULL, zipcode VARCHAR(20) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, role VARCHAR(20) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE brand (id INT NOT NULL, name VARCHAR(255) NOT NULL, kbis BYTEA NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE institute (id INT NOT NULL, name VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, zipcode VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE opinion (id INT NOT NULL, rating INT DEFAULT NULL, comment TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE performance (id INT NOT NULL, performance_name VARCHAR(255) NOT NULL, description VARCHAR(255) DEFAULT NULL, number_of_clients_max INT NOT NULL, stripe_price_id VARCHAR(255) DEFAULT NULL, status VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE performance_sport (performance_id INT NOT NULL, sport_id INT NOT NULL, PRIMARY KEY(performance_id, sport_id))');
        $this->addSql('CREATE INDEX IDX_4225584DB91ADEEE ON performance_sport (performance_id)');
        $this->addSql('CREATE INDEX IDX_4225584DAC78BCF8 ON performance_sport (sport_id)');
        $this->addSql('CREATE TABLE planning (id INT NOT NULL, day_start_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, day_end_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, duration INT NOT NULL, time_start_at TIME(0) WITHOUT TIME ZONE NOT NULL, time_end_at TIME(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN planning.day_start_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN planning.day_end_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE reservation (id INT NOT NULL, slot_id_id INT NOT NULL, client_id_id INT NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_42C8495511F1B11A ON reservation (slot_id_id)');
        $this->addSql('CREATE INDEX IDX_42C84955DC2902E0 ON reservation (client_id_id)');
        $this->addSql('CREATE TABLE review (id INT NOT NULL, coach_id_id INT NOT NULL, client_id_id INT NOT NULL, number_of_stars INT DEFAULT NULL, comment VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_794381C66BC6FD7D ON review (coach_id_id)');
        $this->addSql('CREATE INDEX IDX_794381C6DC2902E0 ON review (client_id_id)');
        $this->addSql('CREATE TABLE service (id INT NOT NULL, name VARCHAR(255) NOT NULL, description TEXT NOT NULL, price INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE slot (id INT NOT NULL, performance_id_id INT NOT NULL, number_of_clients INT DEFAULT NULL, week_day VARCHAR(255) NOT NULL, day_start_at DATE NOT NULL, day_end_at DATE NOT NULL, time_start_at TIME(0) WITHOUT TIME ZONE NOT NULL, time_end_at TIME(0) WITHOUT TIME ZONE NOT NULL, duration_minutes INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_AC0E206727E429C8 ON slot (performance_id_id)');
        $this->addSql('CREATE TABLE slot_user (slot_id INT NOT NULL, user_id INT NOT NULL, PRIMARY KEY(slot_id, user_id))');
        $this->addSql('CREATE INDEX IDX_53BA7CDE59E5119C ON slot_user (slot_id)');
        $this->addSql('CREATE INDEX IDX_53BA7CDEA76ED395 ON slot_user (user_id)');
        $this->addSql('CREATE TABLE sport (id INT NOT NULL, name_sport VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE performance_sport ADD CONSTRAINT FK_4225584DB91ADEEE FOREIGN KEY (performance_id) REFERENCES performance (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE performance_sport ADD CONSTRAINT FK_4225584DAC78BCF8 FOREIGN KEY (sport_id) REFERENCES sport (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C8495511F1B11A FOREIGN KEY (slot_id_id) REFERENCES slot (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955DC2902E0 FOREIGN KEY (client_id_id) REFERENCES "appuser" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C66BC6FD7D FOREIGN KEY (coach_id_id) REFERENCES "appuser" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C6DC2902E0 FOREIGN KEY (client_id_id) REFERENCES "appuser" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot ADD CONSTRAINT FK_AC0E206727E429C8 FOREIGN KEY (performance_id_id) REFERENCES performance (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot_user ADD CONSTRAINT FK_53BA7CDE59E5119C FOREIGN KEY (slot_id) REFERENCES slot (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot_user ADD CONSTRAINT FK_53BA7CDEA76ED395 FOREIGN KEY (user_id) REFERENCES "appuser" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE "appuser_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE brand_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE institute_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE opinion_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE performance_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE planning_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE reservation_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE review_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE service_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE slot_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE sport_id_seq CASCADE');
        $this->addSql('ALTER TABLE performance_sport DROP CONSTRAINT FK_4225584DB91ADEEE');
        $this->addSql('ALTER TABLE performance_sport DROP CONSTRAINT FK_4225584DAC78BCF8');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT FK_42C8495511F1B11A');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT FK_42C84955DC2902E0');
        $this->addSql('ALTER TABLE review DROP CONSTRAINT FK_794381C66BC6FD7D');
        $this->addSql('ALTER TABLE review DROP CONSTRAINT FK_794381C6DC2902E0');
        $this->addSql('ALTER TABLE slot DROP CONSTRAINT FK_AC0E206727E429C8');
        $this->addSql('ALTER TABLE slot_user DROP CONSTRAINT FK_53BA7CDE59E5119C');
        $this->addSql('ALTER TABLE slot_user DROP CONSTRAINT FK_53BA7CDEA76ED395');
        $this->addSql('DROP TABLE "appuser"');
        $this->addSql('DROP TABLE brand');
        $this->addSql('DROP TABLE institute');
        $this->addSql('DROP TABLE opinion');
        $this->addSql('DROP TABLE performance');
        $this->addSql('DROP TABLE performance_sport');
        $this->addSql('DROP TABLE planning');
        $this->addSql('DROP TABLE reservation');
        $this->addSql('DROP TABLE review');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE slot');
        $this->addSql('DROP TABLE slot_user');
        $this->addSql('DROP TABLE sport');
    }
}
