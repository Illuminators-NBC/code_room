import React from 'react';
import { Category } from '../../../types/category';

interface CategoryTagsProps {
  selectedCategories: Category[];
  onRemoveCategory: (category: string) => void;
}

const CategoryTags: React.FC<CategoryTagsProps> = ({ selectedCategories, onRemoveCategory }) => {
  return (
    <div className="flex gap-2">
      {selectedCategories?.map((category, index) => (
        <span
          key={index}
          className={`px-2 py-1 rounded-full text-sm flex items-center ${category.backgroundColor} ${category.color}`}
        >
          {category.name}
          <button
            onClick={() => onRemoveCategory(category.name)}
            className="ml-2 font-bold hover:text-red-500 transition-colors duration-200"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
};

export default CategoryTags;
