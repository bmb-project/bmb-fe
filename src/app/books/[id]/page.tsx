'use client'

import { BookInfo } from '@/components/organisms/BookInfo'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { BookInfoData, BookWishData } from '@/types/books'
import { toast, Toaster } from 'sonner'
import { Heart } from 'lucide-react'
import { Dialog } from '@/components/ui/dialog'
import { useState } from 'react'
import { ReturnDialogContent } from '@/components/organisms/ReturnDialogContent'

const mockData: BookInfoData = {
  id: '201',
  isbn: '9784479394358',
  title:
    '本を読んだことがない32歳がはじめて本を読む〜走れメロス・一房の葡萄・杜子春・本棚',
  description: `【100万人が沸いたスゴい読書！！！！】
          名作３作＋『変な家』大ヒット・雨穴「本棚」特別寄稿！
          
          ＳＮＳで話題沸騰の「オモコロ」大人気シリーズを書籍化！
          「読書の常識が変わる……。これは全く新しい本の読み方です」――雨穴氏
          「ついに日本一おもしろく『走れメロス』を読む人間が現れた」――ダ・ヴィンチ・恐山氏

          「生まれて一度も読書をしたことがない男が本を読んだら、一体どうなるんだろう」
          そんな素朴な疑問がきっかけで生まれた「本を読んだことがない32歳が初めて『走れメロス』を読む日」というオモコロ記事。
          １人の男が人生で初めて本を読む。ただそれだけの記事が爆発的に拡散され、100万人の目に留まる大ヒット記事に……！`,
  thumbnail: '/img/book/book_thumbnail.jpg',
  author_name: 'かまど・みくのしん',
  publisher_name: '大和書房',
  publisher_date: '2024-09-19',
  status: 'CHECKEDOUT',
}

const mockWishData: BookWishData = {
  wished: false,
  wish_count: 5,
}

export default function BookPage() {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const handleToggleWish = (wished: boolean) => {
    toast(
      <span className="flex gap-2">
        {wished ? (
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
    <GnbTemplate>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <BookInfo
          bookData={mockData}
          wishData={mockWishData}
          onToggleWish={handleToggleWish}
          setOpenDialog={setOpenDialog}
        />
        <ReturnDialogContent setOpenDialog={setOpenDialog} />
      </Dialog>
      <Toaster position="top-center" />
    </GnbTemplate>
  )
}