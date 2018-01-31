(function (angular) {
    var app = angular.module("Aplikacija");
    app.controller("Kontroler", function ($http) {
        var lv = this;

        lv.artikli = [];
        lv.korisnici = [];
        lv.kategorije = [];
        lv.noviInd = false;
        lv.korisnikInd = false;
        lv.prijavaInd = false;
        lv.registracijaInd = false;
        lv.artikliInd = true;
        lv.detaljiInd = false;
        lv.korisnicko_ime = "";
        lv.lozinka = "";
        lv.prijavljen = false;
        lv.prijavljenKorisnik = undefined;
        lv.lozinka2 = "";
        lv.jednaKategorija = "";
        lv.kolicinaKupi = 0;
        lv.filterKorisnik = "";
        lv.novi = {};
        lv.noviKorisnik = {};
        lv.izmjenaKorisnik = {};
        lv.zaIzmjenu = {};
        lv.zaPrikaz = {};
        lv.artikal = {};
        lv.pretraga = "";
        lv.stanja = ["Novo", "Korišteno"];
        lv.polovi = ["Muški", "Ženski"];
        lv.sortiranje = ["naziv", "cijena"];
        lv.kriterijum = "naziv";
        lv.smijer = false;
        lv.smijerSimbol = "rastući";

        lv.dobaviKorisnike = function() {
            $http.get("/korisnici").then(function(response) {
                lv.korisnici = response.data;
                lv.noviKorisnik = {
		            "korisnicko_ime" : "",
		            "lozinka" : "",
		            "profilna_slika" : "",
		            "ime" : "",
		            "prezime" : "",
		            "pol" : "",
		            "adresa" : "",
		            "email" : "",
		            "telefon" : "",
		            "stanje_racuna" : 0,
		            "prijavljen" : 0
		        };
            }, function(reason) {
                console.log(reason);
            });
        }

        lv.dobaviKategorije = function() {
            $http.get("/kategorije").then(function(response) {
                lv.kategorije = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        lv.dobaviKorisnike();
        lv.dobaviKategorije();

        lv.dobaviArtikle = function() {
            lv.filterKorisnik = "";
            lv.artikliInd = true;
            lv.noviInd = false;
            lv.prijavaInd = false;
            lv.registracijaInd = false;
            lv.korisnikInd = false;
            lv.detaljiInd = false;
            lv.odustaniOdIzmjene();
            lv.novi = {
	            "naziv": "",
	            "opis": "",
	            "slika": "",
	            "cijena": 1,
	            "stanje": "",
	            "kolicina": 1,
	            "datum": "",
	            "kategorije_id": "",
	            "korisnici_id": "",
	            "korisnik": "",
	            "kategorija": ""
	        };
            $http.get("/artikli").then(function(response) {
                lv.artikli = response.data;
                lv.jednaKategorija = "";
            }, function(reason) {
                console.log(reason);
            });
        }

        lv.sakrijArtikle = function(){
        	lv.artikliInd = false;
        }

        lv.dodaj = function() {
            lv.novi["korisnici_id"] = lv.prijavljenKorisnik["id"];
            lv.novi["kategorije_id"] = lv.novi["kategorija"]["id"];
            lv.novi["slika"] = "images/nema-slika-0.jpg";
            var datum = new Date();
            lv.novi["datum"] = ("0"+datum.getDate()).slice(-2)+"."+("0"+(datum.getMonth()+1)).slice(-2)+"."+datum.getFullYear()+"."+" "
            					+("0"+datum.getHours()).slice(-2)+":"+("0"+datum.getMinutes()).slice(-2)+":"+("0"+datum.getSeconds()).slice(-2);
            $http.post("/artikli/", lv.novi).then(function(response){
                if(response.data["status"] == "zavrseno") {
                    lv.dobaviArtikle();

                }
            },
            function(reason){
                console.log(reason);
            })
        };

        lv.provjeriLozinke = function(){
            if (lv.noviKorisnik.lozinka == lv.lozinka2) {
                return true;
            }
            else if (lv.izmjenaKorisnik.lozinka == lv.lozinka2) {
                return true;
            }
            else{
            	lv.noviKorisnik.lozinka = null;
                lv.izmjenaKorisnik.lozinka = null;
            	lv.lozinka2 = null;
                return false;
            }
        }

        lv.provjeriKorisnickoIme = function(){
            var i = 0;
            for (var k in lv.korisnici[i].korisnicko_ime){
                if (i > lv.korisnici.length - 1)
                    break;
                if (lv.korisnici[k].korisnicko_ime == lv.noviKorisnik.korisnicko_ime){
                    lv.noviKorisnik.korisnicko_ime = null; 
                    return false;
                }
                i++;
            }
            return true;
        }

        lv.dodajKorisnika = function() {
            lv.noviKorisnik.profilna_slika = "images/profile.png";
            $http.post("/korisnici/", lv.noviKorisnik).then(function(response){
                if(response.data["status"] == "zavrseno") {
                    lv.dobaviKorisnike();
                    lv.lozinka2 = "";
                    lv.prijavaPrikazi();
                }
            },
            function(reason){
                console.log(reason);
            })
        };

        lv.dobaviArtikal = function(id) {
            $http.get("/artikli/"+id).then(function(response){
                lv.artikal = response.data;
            },
            function(reason){
                console.log(reason)
            });
        };

        lv.dobaviKategoriju = function(nazivKategorije) {
            lv.filterKorisnik = "";
            lv.artikliInd = true;
            lv.noviInd = false;
            lv.prijavaInd = false;
            lv.registracijaInd = false;
            lv.korisnikInd = false;
            lv.detaljiInd = false;
            lv.odustaniOdIzmjene();
            lv.novi = {
	            "naziv": "",
	            "opis": "",
	            "slika": "",
	            "cijena": 1,
	            "stanje": "",
	            "kolicina": 1,
	            "datum": "",
	            "kategorije_id": "",
	            "korisnici_id": "",
	            "korisnik": "",
	            "kategorija": ""
	        };
            $http.get("/kategorije/"+nazivKategorije).then(function(response){
                lv.jednaKategorija = nazivKategorije;
            },
            function(reason){
                console.log(reason)
            });
        };

        lv.ukloni = function(id) {
            $http.delete("/artikli/"+id).then(function(response){
                lv.dobaviArtikle();
            },
            function(reason){
                console.log(reason)
            });
        };

        lv.ukloniKorisnika = function(id) {
            $http.delete("/korisnici/"+id).then(function(response){
                lv.dobaviKorisnike();
            },
            function(reason){
                console.log(reason)
            });
        };

        lv.nadjiKategoriju = function(nazivKategorije){
        	for (k in lv.kategorije){
        		if (nazivKategorije == lv.kategorije[k].nazivKategorije) {
        			return lv.kategorije[k];
        		}
        	}
        	return null;
        }

        lv.pripremiZaIzmjenu = function(artikal) {
        	lv.sakrijArtikle();
            lv.zaIzmjenu = angular.copy(artikal);
            lv.zaIzmjenu.kategorija = lv.nadjiKategoriju(artikal.nazivKategorije);
        }

        lv.pripremiZaIzmjenuKorisnik = function(korisnik) {
            lv.sakrijArtikle();
            lv.korisnikInd = false;
            lv.izmjenaKorisnik = angular.copy(korisnik);
        }

        lv.odustaniOdIzmjene = function() {
            lv.zaIzmjenu = {};
            lv.izmjenaKorisnik = {};
            lv.lozinka2 = "";
            lv.artikliInd = true;
        }

        lv.izmijeniArtikal = function() {
            lv.zaIzmjenu["kategorije_id"] = lv.zaIzmjenu["kategorija"]["id"];
            var datum = new Date();
            lv.zaIzmjenu["datum"] = ("0"+datum.getDate()).slice(-2)+"."+("0"+(datum.getMonth()+1)).slice(-2)+"."+datum.getFullYear()+"."+" "
            					+("0"+datum.getHours()).slice(-2)+":"+("0"+datum.getMinutes()).slice(-2)+":"+("0"+datum.getSeconds()).slice(-2);
            $http.put("/artikli/"+lv.zaIzmjenu.id, lv.zaIzmjenu).then(function(response){
                lv.dobaviArtikle();
                lv.zaIzmjenu = {};
            },
            function(reason){
                console.log(reason)
            });
        }

        lv.izmijeniKorisnika = function() {
            $http.put("/korisnici/"+lv.izmjenaKorisnik.id, lv.izmjenaKorisnik).then(function(response){
                lv.dobaviKorisnike();
                lv.lozinka2 = "";
                lv.izmjenaKorisnik = {};
                lv.korisnikInd = true;
            },
            function(reason){
                console.log(reason)
            });
        }

        lv.prijava = function() {
            for (k in lv.korisnici){
                if (lv.korisnici[k].korisnicko_ime == lv.korisnicko_ime && lv.korisnici[k].lozinka == lv.lozinka) {
                    lv.prijavljenKorisnik = lv.korisnici[k];
                    lv.dobaviArtikle();
                    lv.prijavljen = true;
                    lv.korisnicko_ime = "";
                    lv.lozinka = "";
                }
            }
            if(lv.prijavaInd){
                lv.korisnicko_ime = null;
                lv.lozinka = null;
            }
        }

        lv.noviPrikazi = function(){
            if (lv.prijavljen) {
                lv.noviInd = true;
            }
            else{
                alert("Morate biti prijavljeni.");
                lv.prijavaPrikazi();
            }
            lv.detaljiInd = false;
            lv.korisnikInd = false;
            lv.zaIzmjenu = {};
            lv.izmjenaKorisnik = {};
            lv.sakrijArtikle();
        }

        lv.prijavaPrikazi = function(){
            lv.prijavaInd = true;
            lv.registracijaInd = false;
            lv.sakrijArtikle();
            lv.detaljiInd = false;
        }

        lv.registracijaPrikazi = function(){
            lv.registracijaInd = true;
            lv.prijavaInd = false;
            lv.detaljiInd = false;
            lv.sakrijArtikle();
        }

        lv.nadjiKorisnika = function(id){
        	for (k in lv.korisnici){
        		if (id == lv.korisnici[k].id) {
        			return lv.korisnici[k];
        		}
        	}
        	return null;
        }

        lv.prikaziDetalje = function(artikal){
        	lv.detaljiInd = true;
        	lv.sakrijArtikle();
        	lv.zaPrikaz = angular.copy(artikal);
            lv.zaPrikaz.kategorija = lv.nadjiKategoriju(artikal.nazivKategorije);
            lv.zaPrikaz.korisnik = lv.nadjiKorisnika(artikal.korisnici_id);
        }

        lv.odjava = function(){
        	lv.prijavljenKorisnik = undefined;
            lv.prijavljen=false;
            lv.dobaviArtikle();
        }

        lv.kupi = function(artikal){
        	if (lv.prijavljenKorisnik == undefined) {
        		alert("Morate biti prijavljeni.");
        		lv.prijavaPrikazi();
        	}
        	else if (artikal.kolicina < 1) {
        		alert("Nema na stanju.");
        	}
        	else if (lv.kolicinaKupi < 1) {
        		alert("Neispravan iznos količine.");
        	}
        	else if (artikal.cijena*lv.kolicinaKupi <= lv.prijavljenKorisnik.stanje_racuna) {
        		alert("Uspiješna kupovina");
        		lv.zaIzmjenu2 = artikal;
	            lv.zaIzmjenu2["kategorije_id"] = lv.zaIzmjenu2["kategorija"]["id"];
	            lv.zaIzmjenu2["kolicina"] = lv.zaIzmjenu2["kolicina"] - lv.kolicinaKupi;
	            var datum = new Date(lv.zaIzmjenu2["datum"]);
	            lv.zaIzmjenu2["datum"] = ("0"+datum.getDate()).slice(-2)+"."+("0"+(datum.getMonth()+1)).slice(-2)+"."+datum.getFullYear()+"."+" "
	            					+("0"+datum.getHours()).slice(-2)+":"+("0"+datum.getMinutes()).slice(-2)+":"+("0"+datum.getSeconds()).slice(-2);
	            $http.put("/artikli/"+lv.zaIzmjenu2.id, lv.zaIzmjenu2).then(function(response){
	                lv.dobaviArtikle();
	                lv.zaIzmjenu2 = {};
	            },
	            function(reason){
	                console.log(reason)
	            });
	            lv.izmjenaKorisnik = lv.prijavljenKorisnik;
	            lv.izmjenaKorisnik["stanje_racuna"] -= artikal.cijena*lv.kolicinaKupi;
	            lv.izmijeniKorisnika();
        	}
        	else{
        		alert("Nedovoljan iznos na računu.");
        	}
        	lv.kolicinaKupi = 0;
        }

        lv.mojProfil = function(){
        	lv.korisnikInd = true;
        	lv.detaljiInd = false;
            lv.noviInd = false;
            lv.izmjenaKorisnik = {};
            lv.zaIzmjenu = {};
        	lv.sakrijArtikle();
        }

        lv.autor = function(artikal){
        	if (!lv.prijavljen)
        		return false;
            else if(artikal.korisnici_id == lv.prijavljenKorisnik.id)
                return true;
            else
            	return false;
        }

        lv.sortiraj = function(kriterijum){
            lv.kriterijum = kriterijum;
        }

        lv.mojiArtikli = function(){
            lv.dobaviArtikle();
            lv.filterKorisnik = lv.prijavljenKorisnik.korisnicko_ime;
        }

        lv.promijeniSmijer = function(){
            if (lv.smijer == false) {
                lv.smijer = true;
                lv.smijerSimbol = "opadajući";
            }
            else if (lv.smijer == true) {
                lv.smijer = false;
                lv.smijerSimbol = "rastući";
            }
        }

        lv.dobaviArtikle();
    });
})(angular);