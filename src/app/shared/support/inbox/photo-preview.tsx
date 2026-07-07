'use client';

import { STATIC_FILES_URL } from '@/config/api.config';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PhotoSlider } from 'react-photo-view';

const images = [
  `${STATIC_FILES_URL}/files/TICKET_ATTACHMENT/6c5f09e1-37a1-49cc-b5dc-f2d775a930a0.jpg`,
];
export default function PhotoPreview() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      {/* <Button onClick={() => setIndex(2)}>setIndex(2)</Button>
      <Button onClick={() => setIndex(4)}>setIndex(4)</Button> */}
      <button onClick={() => setVisible(true)}>مشاهده</button>

      <PhotoSlider
        images={images.map((item) => ({ src: item, key: item }))}
        visible={visible}
        onClose={() => setVisible(false)}
        index={index}
        onIndexChange={setIndex}
      />
    </>
  );
}
