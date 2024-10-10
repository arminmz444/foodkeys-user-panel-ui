import CompanyDetailsGallery from './company-details-gallery';
import CompanyDetailsRelatedCompanies from './company-details-related-companies';
import CompanyDetailsReview from './company-details-review';
import CompanyDetailsDescription from './company-details-description';
import CompanyDeliveryOptions from './company-delivery-options';
import CompanyDetailsSummery from './company-details-summery';

// @ts-ignore
export default function CompanyDetails({ data, isLoading, isError }) {
  return (
    <>
      <div className="@3xl:grid @3xl:grid-cols-12">
        <div className="col-span-7 mb-7 @container @lg:mb-10 @3xl:pe-10">
          <CompanyDetailsGallery />
        </div>
        <div className="col-span-5 @container">
          <CompanyDetailsSummery />
          <CompanyDeliveryOptions />
          <CompanyDetailsDescription />
          <CompanyDetailsReview />
        </div>
      </div>
      <CompanyDetailsRelatedCompanies />
    </>
  );
}
