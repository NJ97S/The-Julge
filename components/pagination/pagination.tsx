import Image from 'next/image';
import Link from 'next/link';

import {
  LIMIT_PAGE_COUNT_NUM,
  calculateMovePageValue,
  calculateSliceValue,
  isActiveControlBtn,
} from '@/utils/calculatePage';

function Pagination({
  page,
  totalDataCount,
  sliceDataValue,
}: {
  page: any;
  totalDataCount: number;
  sliceDataValue: number;
}) {
  const defaultPage = page || '1';
  const pageNum = parseInt(defaultPage, 10);
  const pageLength = Math.ceil(totalDataCount / sliceDataValue);
  if (pageLength <= LIMIT_PAGE_COUNT_NUM) {
    return (
      <div className="w-full py-[8px] px-[12px] flex justify-center items-center">
        <div className="flex gap-[20px] items-center ">
          <div className="flex gap-[4px] md:gap-[2px]">
            {Array.from({ length: pageLength }, (_, index) => index + 1).map((number) => {
              if (pageNum === number)
                return (
                  <span
                    key={number + 'kla'}
                    className="w-[32px] h-[32px] p-[12px] rounded-[4px] text-[14px] leading-[18px] inline-flex justify-center items-center md:w-[40px] md:h-[40px] bg-red-20"
                  >
                    {number}
                  </span>
                );
              return (
                <Link
                  key={number + 'kla'}
                  className={`w-[24px] h-[24px] p-[12px] rounded-[4px] text-[14px] leading-[18px] inline-flex justify-center items-center md:w-[40px] md:h-[40px] `}
                  href={`?page=${number}`}
                  scroll={false}
                >
                  {number}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  const isBoundaryPage = Number.isInteger(pageNum / LIMIT_PAGE_COUNT_NUM);
  const [prevBtnPageValue, nextBtnPageValue] = calculateMovePageValue(pageNum, isBoundaryPage);
  const sliceValue = calculateSliceValue(pageNum, isBoundaryPage);
  const [isActivePrevBtn, isActiveNextBtn] = isActiveControlBtn(pageNum, pageLength);

  return (
    <div className="w-full py-[8px] px-[12px] flex justify-center items-center mb-[60px]">
      <div className="flex gap-[20px] items-center ">
        {isActivePrevBtn ? (
          <Image src="/icons/previcondisabled.svg" width={20} height={20} alt="이전 버튼 비활성화 아이콘" />
        ) : (
          <Link href={`?page=${prevBtnPageValue}`} scroll={false}>
            <Image src="/icons/previcon.svg" width={20} height={20} alt="이전 버튼 아이콘" />
          </Link>
        )}
        <div className="flex gap-[4px] md:gap-[2px]">
          {Array.from({ length: pageLength }, (_, index) => index + 1)
            .slice(sliceValue, sliceValue + LIMIT_PAGE_COUNT_NUM)
            .map((number) => {
              if (pageNum === number)
                return (
                  <span className="w-[32px] h-[32px] p-[12px] rounded-[4px] text-[14px] leading-[18px] inline-flex justify-center items-center md:w-[40px] md:h-[40px] bg-red-20">
                    {number}
                  </span>
                );
              return (
                <Link
                  key={`${number}s`}
                  className={`w-[32px] h-[32px] p-[12px] rounded-[4px] text-[14px] leading-[18px] inline-flex justify-center items-center md:w-[40px] md:h-[40px] `}
                  href={`?page=${number}`}
                  scroll={false}
                >
                  {number}
                </Link>
              );
            })}
        </div>
        {isActiveNextBtn && (
          <Link href={`?page=${nextBtnPageValue}`} scroll={false}>
            <Image src="/icons/nexticon.svg" width={20} height={20} alt="이전 버튼 아이콘" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Pagination;
