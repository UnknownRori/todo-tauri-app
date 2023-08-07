#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct Todo {
    pub id: i32,
    pub body: String,
    pub is_completed: bool,
}
