# Scoreboards!

> [!NOTE]
> **In order for this addon to work, you need to go into `Experimental Gameplay` and enable `Beta APIs`**
> You need to be operator to run these commands.

## Installation

Click [here](https://github.com/YetNT/scoreboards/releases/latest) for the latest version.\
Scroll down till you find the bold blue .mcaddon file, click it to download it then use whatever you use to import the mod. (If you don't have one, FX file Explorer or ZArchiver, or some other method.)

## Quick Examples

Deaths scoreboard (Sidebar)\
`?new deaths Deaths`\
To remove it later `?remove deaths`

Blocks broken scoreboard (List, descending order)\
`?new bb Blocks?/Broken list desc` (?/ gets replaced with a space.)\
To remove it later `?remove bb`

Blocks Placed scoreboard (Below name)\
`?new pb Placed belowname`\
To remove it later `?remove pb`

## Commands

### **?new** (aliases: **?newscoreboard** **?add**)

Adds a scoreboard of the given type

`?new [type] [name] (display) (sortOrder)`

[type] - Type of scoreboard\
[name] - Name of the scoreboard\
(display) - **_optional_** Where to display the scoreboard. (When not provided, will default to sidebar.)\
(sortOrder) - **_optional_** Sort order if displayed on the sidebar or list. (When not provided will default to ascending order)

### **?remove** (aliases: **?removescoreboard**)

Removes a scoreboard of the given type.

`?remove [type]`

[type] - Type of scoreboard

### Types

**`bb`** - Blocks Broken
**`pb`** - Blocks Placed
**`deaths`** - Deaths

### Display and Sort Order

Allowed display values:\
`list`, `List`\
`belowName`, `BelowName`, `belowname`\
`sidebar`, `Sidebar`, `SideBar`, `sideBar`

Allowed sortOrder values:\
`asc`, `ascending`, `Ascending`\
`des`, `desc`, `descending`, `Descending`

## Error Codes

### {E1}

You either did not type all the parameters or typed too many parameters,\
e.g.\
`?new` will return {E1} error because you have typed no parameters.\
`?remove bb too` will return {E1} because you've given it too many parameters\
`?new pb Name with spaces list asc` will return {E1}, because it has too many params. (The name being separated by spaces causes it to have too much. To have spaces replace the spaces with `?/`. So this will work: `?new pb Name?/with?/spaces list asc`)

### {E2}

An invalid input was given in one of the parameters.

`?new poo Prob` will return {E2} because `poo` is not a valid type.\
`?new pb Name with spaces` will return {E2} because `with` is being treated as the display value and `spaces` as the sortOrder value.  (The name being separated by spaces causes this behaviour. To have spaces replace the spaces with `?/`. So this will work: `?new pb Name?/with?/spaces`)\
`?new pb Blocks?/Placed sidebar Asc` will return {E2} because `Asc` is not a valid sortOrder value.

### {E3}

You're simply not an Operator. You'll get this if you lack operator permissions.

## Links

[Github (source code)](https://github.com/YetNT/scoreboards/)
