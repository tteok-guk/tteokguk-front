'use client'

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function SampleShadcnPage() {
  const { toast } = useToast()

  return (
    <section>
      <p>지금 페이지 진입하면 에러 뜰텐데 페이지네이션 때문임🤔</p>
      <p>원인 아직 못찾음😎</p>

      <hr className="hr"/>


      {/* Badge */}
      <h1 className="font-xl mb-15">Badge</h1>
      <Badge>설날 D-52 (default 컬러는 임시 지정해둠)</Badge>
      <br /><br />
      <Badge className="bg-blue-500 w-300">배경 컬러, width, height 지정 가능</Badge>

      <hr className="hr"/>

      {/* Checkbox */}
      <h1 className="font-xl mb-15">Checkbox</h1>
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">체크했을 때 색상은 디자인 확정되면 변경 예정</Label>
        </div>
      </div>
      <br />
      <div className="items-top flex space-x-2">
        <Checkbox id="terms1" />
        <div className="grid gap-4 leading-none">
          <Label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Label 컴포넌트도 같이 import 해서 쓰시면 돼요
          </Label>
          <p className="text-sm text-muted-foreground">
            밑에 작게 같이 들어갈 텍스트 어쩌고 저쩌고
          </p>
        </div>
      </div>

      <hr className="hr"/>

      {/* Input */}
      <h1 className="font-xl mb-15">Input</h1>
      <div className="flex-center flex-col gap-10">
        <Input type="text" placeholder="placeholder message" />
        <Input type="text" placeholder="className으로 width, height 조정 가능" className="w-300 h-50" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">사진 업로드</Label>
        <Input id="picture" type="file" />
      </div>

      <hr className="hr"/>

      {/* Pagination */}
      <h1 className="font-xl">Pagination</h1>
      <p className="font-sm mb-15">임시로 커스텀 해둔거라 설정에 맞게 바꾸시면 됩니다!</p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <div className="flex-center">
            <PaginationItem>
              <PaginationLink href="#" className="text-14" isActive>1</PaginationLink>
            </PaginationItem>
            <span className="mx-4">/</span>
            <PaginationItem>
              <PaginationLink href="#" className="text-14">5</PaginationLink>
            </PaginationItem>
            <span className="text-14 ml-4">그릇</span>
          </div>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <hr className="hr"/>

      {/* Textarea */}
      <h1 className="font-xl mb-15">Textarea</h1>
      <Textarea placeholder="편지쓰기 어쩌고 저쩌고" />

      <hr className="hr"/>

      {/* Skeleton */}
      <h1 className="font-xl mb-15">Skeleton</h1>
      <div className="flex items-center space-x-8">
        <Skeleton className="h-80 w-80 rounded-full" />
        <div className="space-y-4">
          <Skeleton className="h-30 w-250" />
          <Skeleton className="h-30 w-200" />
        </div>
      </div>

      {/* Toast */}
      <hr className="hr"/>
      <h1 className="font-xl mb-15">Toast</h1>
      <Button
        size="lg"
        className="bg-gray-200"
        onClick={() => {
          toast({
            description: '토스트는 클라이언트 컴포넌트에서만 사용 가능',
          })
        }}
      >
        클릭하면 토스트 나옴
      </Button>

      <br/><br/>
    </section>
  )
}
