import { BookListItem, BookListInfo } from '@/types/books'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { toast, Toaster } from 'sonner'
import { PATHS } from '@/constants/path'

export interface BooksGridViewProps {
  data: BookListInfo
  onLoan: () => void
  onReturn: () => void
}

const BooksGridView = ({ data, onLoan, onReturn }: BooksGridViewProps) => {
  const handleToggleWish = (isWished: boolean) => {
    toast(
      <span className="flex gap-2">
        {isWished ? (
          <>
            <Heart className="text-red-400" />
            お気に入りから削除しました。
          </>
        ) : (
          <>
            <Heart className="text-red-400" fill="#f87162" />
            お気に入りに追加しました。
          </>
        )}
      </span>,
      {
        duration: 2000,
      },
    )
  }

  return (
    <>
      <ul className="-m-3 flex flex-wrap outline-blue-200">
        {data.books.map((item: BookListItem) => {
          const { id, title, author_name, status, wish_count, wished } = item
          return (
            <li
              key={id}
              className="w-6/12 p-3 outline-red-200 sm:w-4/12 md:w-3/12 lg:w-2/12"
            >
              <Link
                href={`${PATHS.BOOKS}/${id}`}
                className="block w-full hover:opacity-70"
              >
                <Image
                  src="/img/book/book_thumbnail.jpg"
                  width={128}
                  height={182}
                  alt="book1"
                  className="aspect-[7/10] w-full"
                />
              </Link>
              <div>
                <Link
                  href={`${PATHS.BOOKS}/${id}`}
                  className="mt-2 line-clamp-2 h-10 text-sm font-normal hover:text-primary hover:underline"
                >
                  {title}
                </Link>
                <span className="mt-2 line-clamp-1 text-xs text-tertiary">
                  {author_name}
                </span>
                <div className="mt-1 flex justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="group w-auto pl-0 text-red-400 hover:bg-transparent hover:text-red-400"
                    onClick={() => {
                      if (wished) handleToggleWish(wished)
                    }}
                  >
                    <span className="relative mr-1">
                      <Heart />
                      <Heart
                        fill="#f87162"
                        className={`absolute left-0 top-0 transition-[opacity] duration-200 group-hover:opacity-100 ${wished ? 'opacity-100' : 'opacity-0'}`}
                      />
                    </span>
                    <span>{wish_count}</span>
                  </Button>
                  <Button
                    variant={status === 'CHECKEDOUT' ? 'outline' : 'default'}
                    className={`mt-1 h-8 w-14 ${status === 'UNAVALIABLE' && 'bg-tertiary'} ${status === 'CHECKEDOUT' && 'border-2 border-primary text-primary hover:bg-primary hover:text-white'}`}
                    disabled={status === 'UNAVALIABLE'}
                    onClick={() => {
                      if (status === 'CHECKEDOUT') {
                        onReturn()
                      } else {
                        onLoan()
                      }
                    }}
                  >
                    {status === 'AVALIABLE'
                      ? '貸出'
                      : status === 'CHECKEDOUT'
                        ? '返却'
                        : '不可'}
                  </Button>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      <Toaster position="top-center" />
    </>
  )
}

export { BooksGridView }
