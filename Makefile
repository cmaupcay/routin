default_target: all
.PHONY : default_target

all: clean dist
.PHONY : all

sync: 
	@-base -f sync . 
	@echo [tensaiji.routin] Projet synchronisé.
.PHONY : sync

clean: clean.dist clean.ts
	@echo [tensaiji.routin] Dossier nettoyé.
.PHONY : clean

cmake: 
	@-mkdir -p cmake && cd cmake && cmake ..
.PHONY : cmake

cible: cmake
	@-cd cmake && make
.PHONY : cible

clean.cmake: 
	@-rm -rf cmake
.PHONY : clean.cmake

clean.cible: 
	@-rm -rf bin
.PHONY : clean.cible

dev: cmake
	@-npx webpack -w
.PHONY : dev

dist: 
	@-npx webpack
.PHONY : dist

clean.dist: 
	@-rm -rf dist
.PHONY : clean.dist

clean.ts: 
	@-rm -rf src/*.d.ts
.PHONY : clean.ts

clear: 
	@-rm -rf node_modules package-lock.json
.PHONY : clear

install: cmake
	@-npm install
.PHONY : install

