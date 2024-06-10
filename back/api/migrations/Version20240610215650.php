<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240610215650 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX uniq_1c52f958e7927c74');
        $this->addSql('ALTER TABLE brand ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE brand ADD image_url VARCHAR(20) DEFAULT NULL');
        $this->addSql('ALTER TABLE brand DROP email');
        $this->addSql('ALTER TABLE brand DROP password');
        $this->addSql('ALTER TABLE brand DROP roles');
        $this->addSql('ALTER TABLE brand ALTER kbis_pdf TYPE BYTEA');
        $this->addSql('ALTER TABLE member ADD image_url VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE brand ADD email VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE brand ADD password VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE brand ADD roles JSON NOT NULL');
        $this->addSql('ALTER TABLE brand DROP user_id');
        $this->addSql('ALTER TABLE brand DROP image_url');
        $this->addSql('ALTER TABLE brand ALTER kbis_pdf TYPE VARCHAR(255)');
        $this->addSql('CREATE UNIQUE INDEX uniq_1c52f958e7927c74 ON brand (email)');
        $this->addSql('ALTER TABLE member DROP image_url');
    }
}
