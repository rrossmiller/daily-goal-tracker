CREATE TABLE IF NOT EXISTS `days` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `created_at`,
    `updated_at`,
    `deleted_at`,
    `day_id` INTEGER,
    `sit_ups` INTEGER,
    `push_ups` INTEGER,
    `squats` INTEGER,
    `extra` VARCHAR(255)
);