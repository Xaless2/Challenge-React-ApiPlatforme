<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240701111202 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE institute_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE opinion_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE planning_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE service_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE institute (id INT NOT NULL, name VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, zipcode VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE opinion (id INT NOT NULL, rating INT DEFAULT NULL, comment TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE planning (id INT NOT NULL, day_start_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, day_end_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, duration INT NOT NULL, time_start_at TIME(0) WITHOUT TIME ZONE NOT NULL, time_end_at TIME(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN planning.day_start_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN planning.day_end_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE service (id INT NOT NULL, name VARCHAR(255) NOT NULL, description TEXT NOT NULL, price INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE sport DROP image');
        $this->addSql('ALTER TABLE sport RENAME COLUMN sport_name TO name_sport');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE institute_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE opinion_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE planning_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE service_id_seq CASCADE');
        $this->addSql('DROP TABLE institute');
        $this->addSql('DROP TABLE opinion');
        $this->addSql('DROP TABLE planning');
        $this->addSql('DROP TABLE service');
        $this->addSql('ALTER TABLE sport ADD image VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE sport RENAME COLUMN name_sport TO sport_name');
    }
}
