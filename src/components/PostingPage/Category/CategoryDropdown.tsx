import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../ui/dropdown-menu';
import { Category } from '../../../types/category';

interface CategoryDropdownProps {
  categories: Category[];
  onCategoryClick: (categoryName: string) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ categories, onCategoryClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((preState) => !preState);
  };

  return (
    <DropdownMenu onOpenChange={toggleDropdown}>
      <DropdownMenuTrigger className="text-pink-600 hover:text-pink-300 transition-colors duration-200 text-xl border-none ">
        Categories {isOpen ? '◢' : '◥'}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        {categories.map((category, index) => (
          <DropdownMenuItem
            key={index}
            className={`${category.color} font-bold cursor-pointer`}
            onClick={() => onCategoryClick(category.name)}
          >
            {category.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDropdown;
