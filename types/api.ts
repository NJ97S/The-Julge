export interface PostSignupBody {
  email: string;
  password: string;
  confirmPassword: string;
  type: 'employee' | 'employer';
}

export interface PostSignInBody {
  email: string;
  password: string;
}

export interface GetNoticesParams {
  page?: number;
  offset?: number;
  limit?: number;
  address: string[];
  keyword: string | null;
  startsAtGte: Date | null;
  hourlyPayGte: number | null;
  sort?: 'time' | 'pay' | 'hour' | 'shop';
}

export interface RecruitResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  address: string[];
  keyword?: string;
  items: JobItem[];
  links: Link[];
}

interface JobItem {
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
    shop: ShopDetail;
  };
  links: Link[];
}

interface ShopDetail {
  item: {
    id: string;
    name: string;
    category: string;
    address1: string;
    address2: string;
    description: string;
    imageUrl: string;
    originalHourlyPay: number;
  };
  href: string;
}

interface Link {
  rel: string;
  description: string;
  method: string;
  href: string;
}

export interface PutProfileBody {
  name?: string;
  phone?: string;
  address?:
    | '서울시 종로구'
    | '서울시 중구'
    | '서울시 용산구'
    | '서울시 성동구'
    | '서울시 광진구'
    | '서울시 동대문구'
    | '서울시 중랑구'
    | '서울시 성북구'
    | '서울시 강북구'
    | '서울시 도봉구'
    | '서울시 노원구'
    | '서울시 은평구'
    | '서울시 서대문구'
    | '서울시 마포구'
    | '서울시 양천구'
    | '서울시 강서구'
    | '서울시 구로구'
    | '서울시 금천구'
    | '서울시 영등포구'
    | '서울시 동작구'
    | '서울시 관악구'
    | '서울시 서초구'
    | '서울시 강남구'
    | '서울시 송파구'
    | '서울시 강동구';
  bio?: string;
}
export interface PostCreateStoreBody {
  name: 'string';
  category: '한식' | '중식' | '일식' | '양식' | '분식' | '카페' | '편의점' | '기타';
  address1:
    | '서울시 종로구'
    | '서울시 중구'
    | '서울시 용산구'
    | '서울시 성동구'
    | '서울시 광진구'
    | '서울시 동대문구'
    | '서울시 중랑구'
    | '서울시 성북구'
    | '서울시 강북구'
    | '서울시 도봉구'
    | '서울시 노원구'
    | '서울시 은평구'
    | '서울시 서대문구'
    | '서울시 마포구'
    | '서울시 양천구'
    | '서울시 강서구'
    | '서울시 구로구'
    | '서울시 금천구'
    | '서울시 영등포구'
    | '서울시 동작구'
    | '서울시 관악구'
    | '서울시 서초구'
    | '서울시 강남구'
    | '서울시 송파구'
    | '서울시 강동구';
  address2: 'string';
  description: 'string';
  imageUrl: 'string';
  originalHourlyPay: 'number';
}

export interface RequestRecruit {
  storeId: string | string[];
  recruitId: string | string[];
  applicationsId?: string;
}
export interface PostRecruitsEditBody {
  Id: string | string[];
  formData: {
    hourlyPay: number;
    startsAt: string; // 양식: 2023-12-23T00:00:00Z
    workhour: number;
    description: string;
  };
}
export interface PostChangeRecruitsEditBody {
  storeId: string | string[];
  recruitId: string | string[];
  formData: {
    hourlyPay: number;
    startsAt: string; // 양식: 2023-12-23T00:00:00Z
    workhour: number;
    description: string;
  };
}
