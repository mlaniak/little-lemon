import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';

const useFormPersist = (form, key) => {
  const values = useWatch({ control: form.control });

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Handle date fields by converting string back to Date object
        Object.keys(parsedData).forEach(field => {
          if (field === 'date' && parsedData[field]) {
            parsedData[field] = new Date(parsedData[field]);
          }
        });
        form.reset(parsedData);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
        localStorage.removeItem(key);
      }
    }
  }, [form, key]);

  // Save form data to localStorage on change
  useEffect(() => {
    if (values) {
      localStorage.setItem(key, JSON.stringify(values));
    }
  }, [values, key]);

  // Clear saved form data
  const clearSavedData = () => {
    localStorage.removeItem(key);
    form.reset();
  };

  return { clearSavedData };
};

export default useFormPersist;
