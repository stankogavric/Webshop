-- MySQL Script generated by MySQL Workbench
-- Thu Jan 18 22:43:21 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema web_shop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema web_shop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `web_shop` DEFAULT CHARACTER SET utf8 ;
USE `web_shop` ;

-- -----------------------------------------------------
-- Table `web_shop`.`korisnici`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `web_shop`.`korisnici` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` TEXT NOT NULL,
  `lozinka` TEXT NOT NULL,
  `profilna_slika` TEXT NULL,
  `ime` TEXT NOT NULL,
  `prezime` TEXT NOT NULL,
  `pol` TEXT NULL,
  `adresa` TEXT NOT NULL,
  `email` TEXT NOT NULL,
  `telefon` TEXT NULL,
  `stanje_racuna` FLOAT NOT NULL,
  `prijavljen` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `web_shop`.`kategorije`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `web_shop`.`kategorije` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nazivKategorije` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `web_shop`.`artikli`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `web_shop`.`artikli` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `naziv` TEXT NOT NULL,
  `opis` LONGTEXT NULL,
  `slika` TEXT NULL,
  `cijena` FLOAT NOT NULL,
  `stanje` TEXT NOT NULL,
  `kolicina` INT NOT NULL,
  `datum` DATETIME NOT NULL,
  `kategorije_id` INT NOT NULL,
  `korisnici_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_artikli_kategorije_idx` (`kategorije_id` ASC),
  INDEX `fk_artikli_korisnici1_idx` (`korisnici_id` ASC),
  CONSTRAINT `fk_artikli_kategorije`
    FOREIGN KEY (`kategorije_id`)
    REFERENCES `web_shop`.`kategorije` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_artikli_korisnici1`
    FOREIGN KEY (`korisnici_id`)
    REFERENCES `web_shop`.`korisnici` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
