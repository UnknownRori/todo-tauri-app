use tauri::{CustomMenuItem, Menu, Submenu};

pub fn generate_menu() -> Menu {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let save = CustomMenuItem::new("save".to_string(), "Save");
    let load = CustomMenuItem::new("load".to_string(), "Load");
    let submenu = Submenu::new(
        "File",
        Menu::new().add_item(save).add_item(load).add_item(quit),
    );
    Menu::new().add_submenu(submenu)
}
