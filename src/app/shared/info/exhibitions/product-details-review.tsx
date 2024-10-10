'use client';

import cn from '@/utils/class-names';
import { PiCaretDownBold } from 'react-icons/pi';
import { Collapse } from '@/components/ui/collapse';
import ReviewCard from '@/components/cards/review-card';
import ProductReviewForm from './product-review-form';
import RatingProgressBar from '@/components/rating-progress-bar';

const reviewData = [
  {
    id: 1,
    rating: 4,
    description: 'رضایت‌بخش در هر لحاظ. خدمات و کیفیت بهترین مراتب بود.',
    name: 'صادق قاسم نژاد',
    date: '7 فروردین, 1402',
    images: [
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/review/1.webp',
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/review/2.webp',
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/review/3.webp',
    ],
  },
  {
    id: 2,
    rating: 5,
    description:
      'اخیراً کفش‌های ورزشی Nike MaxComfort را خریداری کردم و باید بگویم که کاملاً تحت تأثیر قرار گرفتم! این کفش‌ها ترکیب کاملی از شیکی و راحتی هستند.',
    name: 'فرشته منصوری',
    date: '12 June, 2023',
    images: [
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/review/4.webp',
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/review/5.webp',
    ],
  },
  {
    id: 3,
    rating: 3,
    description:
      'اولین چیزی که چشم من را جلب کرد، طراحی زیبای آن بود. ظاهر مدرن و روزمره این کفش‌ها امکان استفاده با هر استایل لباسی را فراهم می‌کند.',
    name: 'کی آر مین قاسم نژاد',
    date: '15 June, 2023',
    images: [
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/review/2.webp',
    ],
  },
];

type AverageRatingsProps = {
  totalReviews?: number;
  ratings?: number;
  ratingCount?: any;
};

function AverageRatings({
  totalReviews,
  ratings,
  ratingCount,
}: AverageRatingsProps) {
  //TODO: need to check
  if (!ratingCount) return null;

  return (
    <div className="w-full pb-7 @lg:flex @lg:flex-wrap">
      <div className="flex shrink-0 flex-col justify-center border-gray-100 pb-6 @lg:w-44 @lg:border-e @lg:pb-0">
        <div className="pb-3 text-5xl font-bold text-gray-900">{ratings}</div>
        <p className="text-gray-500">
          <span>{totalReviews}</span> خریدار
        </p>
      </div>
      <div className="space-y-3 py-0.5 @lg:ps-10 @5xl:w-auto">
        <RatingProgressBar
          label={5}
          ratingCount={3}
          totalReviews={totalReviews!}
        />
        <RatingProgressBar
          label={4}
          ratingCount={4}
          totalReviews={totalReviews!}
          progressBarClassName="bg-primary"
        />
        <RatingProgressBar
          label={3}
          ratingCount={7}
          totalReviews={totalReviews!}
          progressBarClassName="bg-primary-light"
        />
        <RatingProgressBar
          label={2}
          ratingCount={0}
          totalReviews={totalReviews!}
          progressBarClassName="bg-orange"
        />
        <RatingProgressBar
          label={1}
          ratingCount={0}
          totalReviews={totalReviews!}
          progressBarClassName="bg-red"
        />
      </div>
    </div>
  );
}

export default function ProductDetailsReview() {
  return (
    <div>
      <Collapse
        className="border-t last-of-type:border-t-0"
        defaultOpen={true}
        header={({ open, toggle }) => (
          <div
            role="button"
            onClick={toggle}
            className="font-iransans font-iransans flex w-full cursor-pointer items-center justify-between py-6 text-lg font-semibold text-gray-900"
          >
            امتیاز و رده بندی
            <div className="flex shrink-0 items-center justify-center">
              <PiCaretDownBold
                className={cn(
                  'h-[18px] w-[18px] transform transition-transform duration-300',
                  open && 'rotate-180'
                )}
              />
            </div>
          </div>
        )}
      >
        <AverageRatings
          ratingCount={reviewData}
          totalReviews={reviewData.reduce((accumulator, item) => {
            return accumulator + item.rating;
          }, 0)}
          ratings={4.1}
        />

        {reviewData.map((item) => (
          <ReviewCard
            key={`review-key-${item.id}`}
            customer={{ name: item.name }}
            message={item.description}
            attachment={item.images}
            date={new Date()}
          />
        ))}
      </Collapse>
      <ProductReviewForm />
    </div>
  );
}
