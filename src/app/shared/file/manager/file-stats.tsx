'use client';

import cn from '@/utils/class-names';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import DocIcon from '@/components/icons/doc-solid';
import ImageIcon from '@/components/icons/image-solid';
import MusicIcon from '@/components/icons/music-solid';
import VideoIcon from '@/components/icons/video-solid';
import DriveIcon from '@/components/icons/drive-solid';
import { useScrollableSlider } from '@/hooks/use-scrollable-slider';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import MetricCard from '@/components/cards/metric-card';
import CircleProgressBar from '@/components/charts/circle-progressbar';

type FileStatsType = {
  className?: string;
};

const filesStatData = [
  {
    id: 1,
    title: 'کل فضا',
    metric: '94 گیگابایت',
    icon: <DriveIcon className="h-12 w-10" />,
    fill: '#4c5c75',
    percentage: 94,
  },
  {
    id: 2,
    title: 'عکس ها',
    metric: '26 گیگابایت',
    icon: <ImageIcon className="h-10 w-10" />,
    fill: '#f3962d',
    percentage: 26,
  },
  {
    id: 3,
    title: 'سند ها',
    metric: '38 گیگابایت',
    icon: <DocIcon className="h-10 w-10" />,
    fill: '#6d98ff',
    percentage: 38,
  },
  {
    id: 4,
    title: 'صوت ها',
    metric: '54 گیگابایت',
    icon: <MusicIcon className="h-10 w-10" />,
    fill: '#fbc13b',
    percentage: 54,
  },
  {
    id: 5,
    title: 'فیلم ها',
    metric: '67 گیگابایت',
    icon: <VideoIcon className="h-10 w-10" />,
    fill: '#e16244',
    percentage: 67,
  },
];
// @md:grid-cols-2 @2xl:grid-cols-3 @3xl:grid-cols-4 @7xl:grid-cols-5
export default function FileStats({ className }: FileStatsType) {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();

  return (
    <div
      className={cn(
        'relative flex w-auto items-center overflow-hidden',
        className
      )}
    >
      <Button
        title="Prev"
        variant="text"
        ref={sliderPrevBtn}
        onClick={() => scrollToTheLeft()}
        className="!absolute left-0 top-0 z-10 !h-full w-8 !justify-start rounded-none bg-gradient-to-r from-white via-white to-transparent px-0  text-gray-500 hover:text-black dark:from-gray-50/80 dark:via-gray-50/80 3xl:hidden"
      >
        <PiCaretLeftBold className="h-5 w-5" />
      </Button>
      <div className="w-full overflow-hidden">
        <div
          ref={sliderEl}
          className="custom-scrollbar-x grid grid-flow-col gap-5 overflow-x-auto scroll-smooth"
        >
          {filesStatData.map((stat: any) => {
            return (
              <MetricCard
                key={stat.id}
                title=""
                metric=""
                className="min-w-[292px] max-w-full flex-row-reverse"
              >
                <div className="flex items-center justify-start gap-5">
                  <div className="w-14">
                    <CircleProgressBar
                      percentage={stat.percentage}
                      size={80}
                      stroke="#D7E3FE"
                      strokeWidth={5}
                      progressColor={stat.fill}
                      useParentResponsive={true}
                      label={stat.icon}
                      strokeClassName="dark:stroke-gray-300"
                    />
                  </div>
                  <div className="">
                    <Text className="mb-1 text-sm font-medium text-gray-500">
                      {stat.title}
                    </Text>
                    <Text
                      tag="h4"
                      className="mb-1 text-xl font-semibold text-gray-900"
                    >
                      {stat.metric}
                      <span className="inline-block text-sm font-normal text-gray-500">
                        &nbsp;of 100 گیگابایت
                      </span>
                    </Text>
                  </div>
                </div>
              </MetricCard>
            );
          })}
        </div>
      </div>
      <Button
        title="Next"
        variant="text"
        ref={sliderNextBtn}
        onClick={() => scrollToTheRight()}
        className="!absolute right-0 top-0 z-10 !h-full w-8 !justify-end rounded-none bg-gradient-to-l from-white via-white to-transparent px-0  text-gray-500 hover:text-black dark:from-gray-50/80 dark:via-gray-50/80 3xl:hidden"
      >
        <PiCaretRightBold className="h-5 w-5" />
      </Button>
    </div>
  );
}
