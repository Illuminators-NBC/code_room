import React, { useState } from 'react';
import CategoryDropdown from './CategoryDropdown';
import CategoryTags from './CategoryTags';
import { Category } from '../../../types/category';

const categories: Category[] = [
  { name: 'JavaScript', color: 'text-yellow-900', backgroundColor: 'bg-yellow-200' },
  { name: 'React.js', color: 'text-sky-900', backgroundColor: 'bg-sky-200' },
  { name: 'Next.js', color: 'text-gray-900', backgroundColor: 'bg-gray-200' },
  { name: 'Node.js', color: 'text-green-900', backgroundColor: 'bg-green-200' },
  { name: 'TypeScript', color: 'text-blue-900', backgroundColor: 'bg-blue-200' },
  { name: 'Tailwind', color: 'text-cyan-900', backgroundColor: 'bg-cyan-200' },
  { name: 'Zustand', color: 'text-amber-900', backgroundColor: 'bg-amber-200' },
  { name: 'CSS', color: 'text-indigo-900', backgroundColor: 'bg-indigo-200' },
  { name: 'Recoil', color: 'text-red-900', backgroundColor: 'bg-red-200' },
  { name: 'Zotai', color: 'text-gray-900', backgroundColor: 'bg-gray-300' },
  { name: 'TanStack-Query', color: 'text-purple-900', backgroundColor: 'bg-purple-200' }
];

const CategoryManager: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategories((prevCategories) => {
      const category = categories.find((c) => c.name === categoryName);
      if (!category) return prevCategories;

      return prevCategories.some((c) => c.name === categoryName)
        ? // 배열 요소 중 하나라도 callback함수를 통과하면 true : false
          prevCategories.filter((c) => c.name !== categoryName)
        : [...prevCategories, category];
    });
  };

  const handleRemoveCategory = (categoryName: string) => {
    setSelectedCategories((prevCategories) => prevCategories.filter((category) => category.name !== categoryName));
  };

  return (
    <div className="mx-5">
      <CategoryDropdown categories={categories} onCategoryClick={handleCategoryClick} />
      <CategoryTags selectedCategories={selectedCategories} onRemoveCategory={handleRemoveCategory} />
    </div>
  );
};

export default CategoryManager;