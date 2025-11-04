'use client'

import {Pagination} from "flowbite-react";

type Props = {
    currentPage: number;
    pageCount: number;
    pageChanged: (page: number) => void;
}

export default function AppPagination({currentPage, pageCount, pageChanged}: Props) {
    return (
<Pagination 
  currentPage={currentPage} 
  onPageChange={e => pageChanged(e)} 
  totalPages={pageCount} 
  layout="pagination" 
  showIcons={true} 
  className="mb-5 text-blue-600 hover:text-blue-700"
/>    )
}