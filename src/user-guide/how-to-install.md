# How to install the asmeta toolset

The asmeta is a framework with different tools (see [asmeta toolset](https://asmeta.github.io/toolset/) for the list of tools).
Some tools are provided both as eclipse plugins and standalone jars that can be executed at command line. 
Some are only available as jar files (see the individual pages).
Here we present on how to install asmeta with eclipse. 

## Installing ASMETA in eclipse

If you already eclipse working on your machine, you can install the asmeta plugins, by using the following update site:

**https://raw.githubusercontent.com/asmeta/asmeta_update_site/master**

Perform the following steps to install an Asmeta tool from the update site:
 
1. From your Eclipse menu select <i>Help</i> and then  <i>Install new software</i>
2. Check <i>Add ..</i>
3. Add <i>new repository</i> and enter
https://raw.githubusercontent.com/asmeta/asmeta_update_site/master for the update site URL
4. Press <i>Finish</i>.
5. Select the desired tool(s).
6. Follow the steps in the installation wizard.

> [!WARNING]
> If you want to formally prove propeties with AsmetaSMV, you need to install NuSMV separately (see https://nusmv.fbk.eu/)

## Downloading an eclipse with asmeta

We provide also a zip with everything you need to try asmeta. The zip contains eclipse with asmeta already installed (and also NuSMV). 

Look at <https://github.com/asmeta/asmeta#eclispe-with-asmeta-ready-to-use>

You can find an updated version for windows and a working version for MacOS and linux which must be updated using the update site.

### License

Asmeta is released under a GPL-like [license](license.html).

### Experimental tools

We have been working on:

* the AsmetaRE: to generate executable ASMs from Use Case models. 
* the SCA-ASM: an executable modeling language and an engine for service oriented applications. See our paper at EUROMICRO SEAA 2011
* a graphical editor for Asmeta specs based on GMF
