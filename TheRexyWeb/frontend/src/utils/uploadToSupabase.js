import { supabase } from '../supabase';

export async function uploadToSupabase(file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  // Sube la imagen al bucket 'rexy'
  const { data, error } = await supabase.storage.from('rexy').upload(filePath, file);

  if (error) throw error;

  // Obtén la URL pública
  const { data: urlData } = supabase
    .storage
    .from('rexy')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
} 