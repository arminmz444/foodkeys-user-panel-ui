import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CompanyDetails from '@/app/shared/info/food-industry/company/company-details/company-details';
import axiosInstance from "@/utils/axios-instance";
import toast from "react-hot-toast";
// import {useQuery} from "react-query";

export default function CompanyDetailsPage({ params }: any) {
  const pageHeader = {
    title: 'اطلاعات شرکت',
    breadcrumb: [
      {
        href: routes.info.dashboard,
        name: 'بانک صنعت غذا',
      },
      {
        href: routes.info.foodIndustryList,
        name: 'لیست شرکت‌ها',
      },
      {
        href: routes.info.foodIndustryView(params.id),
        name: 'نمایش اطلاعات شرکت',
      },
      {
        name: params.id,
      },
    ],
  };

  const fetchCompany = async () => {
    const API_URL = `https://foodkeys-api-dev.liara.run/api/v1/company/${params.id}`
    const response = await axiosInstance.get(API_URL);

    if (response.data.statusCode === 200) {
      return {
        data: response.data.data,
        totalItems: response.data.pagination.totalElements,
      };
    } else {
      toast.error("خطا در دریافت شرکت‌ها")
      throw new Error('Failed to fetch companies');
    }
  };

  // const { data, isLoading, isError } = useQuery(
  //     ['company'],
  //     () => fetchCompany(),
  //     {
  //       keepPreviousData: true,
  //     }
  // );

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CompanyDetails data={undefined} isLoading={undefined} isError={undefined} />
    </>
  );
}
