'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import cn from '@/utils/class-names';
import { Drawer } from '@/components/ui/drawer';
import { useDirection } from '@/hooks/use-direction';
import CogSolidIcon from '@/components/icons/cog-solid';
import { ActionIcon } from '@/components/ui/action-icon';
import { DrawerHeader } from '@/components/settings/settings-drawer';
import { usePresets } from '@/config/color-presets';
import { useColorPreset } from '@/hooks/use-theme-color';
import { useLocalStorage } from '@/hooks/use-local-storage';
const SettingsDrawer = dynamic(
  () => import('@/components/settings/settings-drawer'),
  {
    ssr: false,
  }
);

export default function SettingsButton({ className }: { className?: string }) {
  const COLOR_PRESETS = usePresets();
  const [isOpen, setOpen] = useState(false);
  const { direction, setDirection } = useDirection();
  const [colorPresetName, setColorPresetName] = useLocalStorage(
    'isomorphic-preset-name',
    COLOR_PRESETS[0].name
  );
  const [colorPresets, setColorPresets] = useLocalStorage<{
    [key: string]: string;
  }>('isomorphic-preset', COLOR_PRESETS[0].colors);

  useColorPreset(colorPresets ?? COLOR_PRESETS[0].colors);

  return (
    <>
      <ActionIcon
        aria-label="تنظیمات"
        variant="text"
        className={cn(
          'relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9',
          className
        )}
        onClick={() => {
          setOpen(true);
        }}
      >
        <CogSolidIcon
          strokeWidth={1.8}
          className="h-[22px] w-auto animate-spin-slow"
        />
      </ActionIcon>
      <Drawer
        isOpen={isOpen}
        customSize="420px"
        placement={'left'}
        onClose={() => setOpen(false)}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
        containerClassName="dark:bg-gray-100"
      >
        <DrawerHeader onClose={() => setOpen(false)} />
        <SettingsDrawer
          direction={direction}
          setDirection={setDirection}
          colorPresetName={colorPresetName}
          setColorPresetName={setColorPresetName}
          colorPresets={colorPresets}
          setColorPresets={setColorPresets}
        />
      </Drawer>
    </>
  );
}
