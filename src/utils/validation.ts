// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidCameroonPhone(phone: string): boolean {
  const phoneRegex = /^(\+237|237)?[6][0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Le mot de passe doit contenir au moins 6 caractères');
  }
  
  if (!/[A-Za-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une lettre');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateFile(file: File, type: 'image' | 'video'): { valid: boolean; error?: string } {
  if (type === 'image') {
    const maxSize = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Format d\'image non supporté. Utilisez JPEG, PNG, JPG ou GIF' };
    }
    
    if (file.size > maxSize) {
      return { valid: false, error: 'L\'image ne doit pas dépasser 2MB' };
    }
  } else if (type === 'video') {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['video/mp4', 'video/mov', 'video/avi'];
    
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Format vidéo non supporté. Utilisez MP4, MOV ou AVI' };
    }
    
    if (file.size > maxSize) {
      return { valid: false, error: 'La vidéo ne doit pas dépasser 10MB' };
    }
  }
  
  return { valid: true };
}