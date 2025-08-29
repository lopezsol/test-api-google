// 🔹 Interfaz para archivos adjuntos de Airtable (como "avatar")
export interface AirtableAttachment {
  id?: string;
  url?: string;
  filename?: string;
  size?: number;
  type?: string;
  thumbnails?: {
    small?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
    full?: { url: string; width: number; height: number };
  };
}

// 🔹 Interfaz para los fields dinámicos de Airtable
export interface AirtableFields {
  first_name?: string;
  last_name?: string;
  email?: string;
  technology?: string[];
  is_active?: boolean;
  supervisor?: string[];           // IDs de registros relacionados
  talent_partner?: string[];
  "email (from supervisor)"?: string[];
  "email (from talent_partner)"?: string[];
  avatar?: AirtableAttachment[];   // Archivos subidos
  projects?: string[];
  // Puedes agregar más campos según tu tabla
  [key: string]: unknown;          // Para cualquier campo dinámico adicional
}

// 🔹 Interfaz para un registro completo de Airtable
export interface AirtableRecord {
  id: string;
  createdTime: string;  // ISO date string
  fields: AirtableFields;
}

// 🔹 Respuesta de lista de Airtable (cuando pides todos los registros)
export interface AirtableListResponse {
  records: AirtableRecord[];
  offset?: string; // Para paginación
}
