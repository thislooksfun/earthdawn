import Store from "electron-store";
import { app, Menu, nativeTheme } from "electron";

// const isMac = process.platform === "darwin";

const prefStore = new Store();

nativeTheme.themeSource = prefStore.get("theme", "system");

const setDarkMode = theme => {
  nativeTheme.themeSource = theme;
  menu.getMenuItemById("theme:follow-os").checked = theme == "system";
  menu.getMenuItemById("theme:dark-mode").checked = theme == "dark";
  menu.getMenuItemById("theme:light-mode").checked = theme == "light";
  Menu.setApplicationMenu(menu);

  prefStore.set("theme", theme);
};

const template = [
  { role: "appMenu" },
  { role: "fileMenu" },
  { role: "editMenu" },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forcereload" },
      { role: "toggledevtools" },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" },
      { type: "separator" },
      {
        label: "Theme",
        submenu: [
          {
            id: "theme:follow-os",
            label: "Follow OS",
            type: "checkbox",
            checked: nativeTheme.themeSource == "system",
            click: setDarkMode.bind(null, "system"),
          },
          {
            id: "theme:dark-mode",
            label: "Dark Mode",
            type: "checkbox",
            checked: nativeTheme.themeSource == "dark",
            click: setDarkMode.bind(null, "dark"),
          },
          {
            id: "theme:light-mode",
            label: "Light Mode",
            type: "checkbox",
            checked: nativeTheme.themeSource == "light",
            click: setDarkMode.bind(null, "light"),
          },
        ],
      },
    ],
  },
  { role: "windowMenu" },
  {
    role: "help",
    submenu: [
      {
        label: `${app.name} Help`,
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://github.com/thislooksfun/earthdawn");
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
