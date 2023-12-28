import { BottomButton } from "@/components/common"

export default function WritePage() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <section className="">
      <h1 className="font-xl pt-38">고명을 선택해 주세요</h1>
      <div className="grid grid-cols-3 mt-40 flex-center gap-12">
        {arr.map((item, idx) => <div key={idx} className="min-w-85 aspect-square bg-pr-100 rounded-6 flex-1 flex-center">{item}</div>)}
      </div>
      <BottomButton fullBtnName="덕담 남기기" />
    </section>
  )
}