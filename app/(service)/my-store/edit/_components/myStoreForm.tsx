'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/button/button';
import Input from '@/components/input/input';
import SelectInput from '@/components/input/selectInput';
import { postCreateStore, requestUploadImg } from '@/services/api';
import { PostCreateStoreBody } from '@/types/api';
import useModal from '@/hooks/useModal';

const FOOD_CATEGORY_LIST = [
  { id: 1, category: '한식' , field:'개발' },
  { id: 2, category: '중식', field:'디자인' },
  { id: 3, category: '일식', field:'경영' },
  { id: 4, category: '양식', field:'마케팅' },
  { id: 5, category: '분식', field:'영업' },
  { id: 6, category: '카페', field:'회계' },
  { id: 7, category: '편의점', field:'상품기획/MD' },
  { id: 8, category: '기타', field:'HR' },
];

const ADDRESS_LIST = [
  { id: 1, category: '서울시 종로구' },
  { id: 2, category: '서울시 중구' },
  { id: 3, category: '서울시 용산구' },
  { id: 4, category: '서울시 성동구' },
  { id: 5, category: '서울시 광진구' },
  { id: 6, category: '서울시 동대문구' },
  { id: 7, category: '서울시 중랑구' },
  { id: 8, category: '서울시 성북구' },
  { id: 9, category: '서울시 강북구' },
  { id: 10, category: '서울시 도봉구' },
  { id: 11, category: '서울시 노원구' },
  { id: 12, category: '서울시 은평구' },
  { id: 13, category: '서울시 서대문구' },
  { id: 14, category: '서울시 마포구' },
  { id: 15, category: '서울시 양천구' },
  { id: 16, category: '서울시 강서구' },
  { id: 17, category: '서울시 구로구' },
  { id: 18, category: '서울시 금천구' },
  { id: 19, category: '서울시 영등포구' },
  { id: 20, category: '서울시 동작구' },
  { id: 21, category: '서울시 관악구' },
  { id: 22, category: '서울시 서초구' },
  { id: 23, category: '서울시 강남구' },
  { id: 24, category: '서울시 송파구' },
  { id: 25, category: '서울시 강동구' },
];

interface FieldValues {
  name: string;
  address2: string;
  originalHourlyPay: number;
  imageUrl: [];
  description: string;
  category: string;
  address1: string;
}

export default function MyStoreForm() {
  const router = useRouter();
  const {openModal} = useModal();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({ mode: 'all' });
  const [imageSrc, setImageSrc] = useState<any>(null);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result);
      };
    }
  };

  const onSubmit = async (formData: any) => {
    try {
      const imageUrl = await requestUploadImg(formData.imageUrl[0]);
      const postData: PostCreateStoreBody = {
        ...formData,
        imageUrl,
        originalHourlyPay: Number(formData.originalHourlyPay),
      };
      const { item } = await postCreateStore(postData);
      openModal({type : 'caution', content : '내 기업이 생성되었습니다', })
   
      router.push(`/my-store/${item.id}`);
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data.message ? err.response?.data.message : '다시 시도해주세요';
        openModal({type:'caution', content : errorMessage})
      }
    }
  };
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="flex flex-col gap-6 mb-6 md:mb-8">
        <div className="flex flex-col gap-5 md:flex-row">
          <Input
            label="기업 이름*"
            type="text"
            errorMessage={errors.name?.message}
            placeholder="기업 이름을 적어주세요."
            {...register('name', {
              required: '기업 이름을 적어주세요',
            })}
          />
          <Controller
            name="category"
            control={control}
            rules={{ required: '분류를 선택해주세요.' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <SelectInput onChange={onChange} errorMessage={error?.message} renderList={FOOD_CATEGORY_LIST}>
                분류*
              </SelectInput>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <Controller
            name="address1"
            control={control}
            rules={{ required: '주소를 선택해주세요.' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <SelectInput onChange={onChange} renderList={ADDRESS_LIST} errorMessage={error?.message}>
                주소*
              </SelectInput>
            )}
          />
          <Input
            label="상세 주소*"
            type="text"
            errorMessage={errors.address2?.message}
            placeholder="주소를 입력해 주세요."
            {...register('address2', {
              required: '상세 주소를 입력해주세요',
            })}
          />
        </div>
        <div className="w-full md:max-w-[330px] xl:max-w-[463px]">
          <Input
            label="기본 시급*"
            type="number"
            rightText="원"
            placeholder="시급을 입력해주세요"
            errorMessage={errors.originalHourlyPay?.message}
            {...register('originalHourlyPay', {
              required: '시급을 입력해주세요',
              validate: (value) => value > 9620 || '최저 시급 이상 입력해주세요. 9620원 이상',
            })}
          />
        </div>
        <div className="w-full md:w-[483px]">
          <p className="mb-2">기업 이미지</p>
          <label
            htmlFor="image-input"
            className={`flex flex-col gap-3 font-bold text-gray-40 w-full max-w-[375px] h-[201px] md:max-w-full md:h-[276px] bg-gray-10 border  ${!imageSrc && 'border-gray-20 '}  rounded-xl justify-center items-center cursor-pointer relative overflow-hidden`}
          >
            <div className="inline-flex flex-col items-center gap-3">
              <Image src="/icons/image-add-icon.svg" width={32} height={32} alt="사진 추가 아이콘" />
              이미지 선택
              <input
                type="file"
                id="image-input"
                className="invisible w-0 h-0"
                {...register('imageUrl', {
                  required: '기업 이미지를 올려주세요',
                  onChange: handleUploadImage,
                })}
              />
            </div>
            {imageSrc && <Image src={imageSrc} fill alt="미리보기 이미지" />}
          </label>
          {errors.imageUrl && <span className="text-xs text-red-500">{errors.imageUrl.message}</span>}
        </div>
        <label htmlFor="store-description">
          <p className="mb-2">기업 설명 </p>
          <textarea
            id="store-description"
            className="w-full h-[153px] rounded-[6px] px-5 py-4 border border-gray-30"
            {...register('description')}
          />
        </label>
      </div>
      <div className="flex justify-center ">
        <div className="w-full md:w-[312px]">
          <Button background="bg-primary" className="h-12">
            등록하기
          </Button>
        </div>
      </div>
    </form>
  );
}
