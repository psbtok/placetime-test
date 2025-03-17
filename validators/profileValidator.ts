export const validateProfile = (profile: {
    nickname: string;
    name: string;
    agreed: boolean;
  }) => {
    const errors: string[] = [];
  
    if (!profile.nickname) {
      errors.push('Nickname is required');
    }
  
    if (!profile.name) {
      errors.push('Name is required');
    }
  
    if (!profile.agreed) {
      errors.push('You must agree to the terms');
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  };