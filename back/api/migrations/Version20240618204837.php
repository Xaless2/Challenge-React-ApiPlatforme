<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240618204837 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE brand (id INT NOT NULL, user_id INT NOT NULL, display_name VARCHAR(255) NOT NULL, kbis_pdf BYTEA DEFAULT NULL, image_url VARCHAR(20) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE establishment (id INT NOT NULL, brand_id_id INT NOT NULL, display_name VARCHAR(255) NOT NULL, phone VARCHAR(255) DEFAULT NULL, address VARCHAR(255) NOT NULL, zip_code VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DBEFB1EE24BD5740 ON establishment (brand_id_id)');
        $this->addSql('CREATE TABLE member (id INT NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, roles JSON NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, phone VARCHAR(255) DEFAULT NULL, address VARCHAR(255) DEFAULT NULL, zip_code VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, image_url VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_70E4FA78E7927C74 ON member (email)');
        $this->addSql('CREATE TABLE performance (id INT NOT NULL, establishment_id_id INT NOT NULL, performance_name VARCHAR(255) NOT NULL, description VARCHAR(255) DEFAULT NULL, number_of_clients_max INT NOT NULL, stripe_price_id VARCHAR(255) DEFAULT NULL, status VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_82D79681FB55A222 ON performance (establishment_id_id)');
        $this->addSql('CREATE TABLE performance_sport (performance_id INT NOT NULL, sport_id INT NOT NULL, PRIMARY KEY(performance_id, sport_id))');
        $this->addSql('CREATE INDEX IDX_4225584DB91ADEEE ON performance_sport (performance_id)');
        $this->addSql('CREATE INDEX IDX_4225584DAC78BCF8 ON performance_sport (sport_id)');
        $this->addSql('CREATE TABLE refresh_tokens (id INT NOT NULL, refresh_token VARCHAR(128) NOT NULL, username VARCHAR(255) NOT NULL, valid TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9BACE7E1C74F2195 ON refresh_tokens (refresh_token)');
        $this->addSql('CREATE TABLE reservation (id INT NOT NULL, slot_id_id INT NOT NULL, client_id_id INT NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_42C8495511F1B11A ON reservation (slot_id_id)');
        $this->addSql('CREATE INDEX IDX_42C84955DC2902E0 ON reservation (client_id_id)');
        $this->addSql('CREATE TABLE review (id INT NOT NULL, coach_id_id INT NOT NULL, client_id_id INT NOT NULL, number_of_stars INT DEFAULT NULL, comment VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_794381C66BC6FD7D ON review (coach_id_id)');
        $this->addSql('CREATE INDEX IDX_794381C6DC2902E0 ON review (client_id_id)');
        $this->addSql('CREATE TABLE slot (id INT NOT NULL, performance_id_id INT NOT NULL, number_of_clients INT DEFAULT NULL, week_day VARCHAR(255) NOT NULL, day_start_at DATE NOT NULL, day_end_at DATE NOT NULL, time_start_at TIME(0) WITHOUT TIME ZONE NOT NULL, time_end_at TIME(0) WITHOUT TIME ZONE NOT NULL, duration_minutes INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_AC0E206727E429C8 ON slot (performance_id_id)');
        $this->addSql('CREATE TABLE slot_user (slot_id INT NOT NULL, user_id INT NOT NULL, PRIMARY KEY(slot_id, user_id))');
        $this->addSql('CREATE INDEX IDX_53BA7CDE59E5119C ON slot_user (slot_id)');
        $this->addSql('CREATE INDEX IDX_53BA7CDEA76ED395 ON slot_user (user_id)');
        $this->addSql('CREATE TABLE sport (id INT NOT NULL, sport_name VARCHAR(255) NOT NULL, image VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE establishment ADD CONSTRAINT FK_DBEFB1EE24BD5740 FOREIGN KEY (brand_id_id) REFERENCES brand (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE performance ADD CONSTRAINT FK_82D79681FB55A222 FOREIGN KEY (establishment_id_id) REFERENCES establishment (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE performance_sport ADD CONSTRAINT FK_4225584DB91ADEEE FOREIGN KEY (performance_id) REFERENCES performance (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE performance_sport ADD CONSTRAINT FK_4225584DAC78BCF8 FOREIGN KEY (sport_id) REFERENCES sport (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C8495511F1B11A FOREIGN KEY (slot_id_id) REFERENCES slot (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955DC2902E0 FOREIGN KEY (client_id_id) REFERENCES member (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C66BC6FD7D FOREIGN KEY (coach_id_id) REFERENCES member (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C6DC2902E0 FOREIGN KEY (client_id_id) REFERENCES member (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot ADD CONSTRAINT FK_AC0E206727E429C8 FOREIGN KEY (performance_id_id) REFERENCES performance (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot_user ADD CONSTRAINT FK_53BA7CDE59E5119C FOREIGN KEY (slot_id) REFERENCES slot (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot_user ADD CONSTRAINT FK_53BA7CDEA76ED395 FOREIGN KEY (user_id) REFERENCES member (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE establishment DROP CONSTRAINT FK_DBEFB1EE24BD5740');
        $this->addSql('ALTER TABLE performance DROP CONSTRAINT FK_82D79681FB55A222');
        $this->addSql('ALTER TABLE performance_sport DROP CONSTRAINT FK_4225584DB91ADEEE');
        $this->addSql('ALTER TABLE performance_sport DROP CONSTRAINT FK_4225584DAC78BCF8');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT FK_42C8495511F1B11A');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT FK_42C84955DC2902E0');
        $this->addSql('ALTER TABLE review DROP CONSTRAINT FK_794381C66BC6FD7D');
        $this->addSql('ALTER TABLE review DROP CONSTRAINT FK_794381C6DC2902E0');
        $this->addSql('ALTER TABLE slot DROP CONSTRAINT FK_AC0E206727E429C8');
        $this->addSql('ALTER TABLE slot_user DROP CONSTRAINT FK_53BA7CDE59E5119C');
        $this->addSql('ALTER TABLE slot_user DROP CONSTRAINT FK_53BA7CDEA76ED395');
        $this->addSql('DROP TABLE brand');
        $this->addSql('DROP TABLE establishment');
        $this->addSql('DROP TABLE member');
        $this->addSql('DROP TABLE performance');
        $this->addSql('DROP TABLE performance_sport');
        $this->addSql('DROP TABLE refresh_tokens');
        $this->addSql('DROP TABLE reservation');
        $this->addSql('DROP TABLE review');
        $this->addSql('DROP TABLE slot');
        $this->addSql('DROP TABLE slot_user');
        $this->addSql('DROP TABLE sport');
    }
}
