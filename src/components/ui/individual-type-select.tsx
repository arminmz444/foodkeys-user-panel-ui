import dynamic from 'next/dynamic';
import { INDIVIDUAL_TYPE } from '@/core/dto/enums/individual-type';
import SelectLoader from '@/components/loader/select-loader';
import { Input } from '@/components/ui/input';
import { ActionIcon } from '@/components/ui/action-icon';
import { PiPlusBold, PiXBold } from 'react-icons/pi';
import { useState } from 'react';

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const individualTypeOptions = [
  {
    value: INDIVIDUAL_TYPE.PERSON.getValue(),
    name: INDIVIDUAL_TYPE.PERSON.getPersianName(),
  },
  {
    value: INDIVIDUAL_TYPE.ORGANIZATION.getValue(),
    name: INDIVIDUAL_TYPE.ORGANIZATION.getPersianName(),
  },
];

interface IndividualTypeSelectProps {
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  isRequired?: boolean;
  onEmailsChange?: (emails: string[]) => void;
}

export default function IndividualTypeSelect({
  value,
  onChange,
  label = 'نوع شخص',
  error,
  placeholder = 'انتخاب کنید',
  isRequired = false,
  onEmailsChange,
}: IndividualTypeSelectProps) {
  const [emails, setEmails] = useState<string[]>(['']);

  const handleAddEmail = () => {
    const newEmails = [...emails, ''];
    setEmails(newEmails);
    onEmailsChange?.(newEmails);
  };

  const handleRemoveEmail = (index: number) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
    onEmailsChange?.(newEmails);
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
    onEmailsChange?.(newEmails);
  };

  return (
    <div className="space-y-4">
      <Select
        options={individualTypeOptions}
        value={value}
        onChange={onChange}
        label={label}
        error={error}
        placeholder={placeholder}
        isRequired={isRequired}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            ایمیل‌ها
          </label>
          <ActionIcon
            variant="outline"
            onClick={handleAddEmail}
            className="h-8 w-8"
            title="افزودن ایمیل"
          >
            <PiPlusBold className="h-4 w-4" />
          </ActionIcon>
        </div>

        {emails.map((email, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
              placeholder="ایمیل"
              className="flex-1"
            />
            {index > 0 && (
              <ActionIcon
                variant="outline"
                onClick={() => handleRemoveEmail(index)}
                className="h-8 w-8"
                title="حذف ایمیل"
              >
                <PiXBold className="h-4 w-4" />
              </ActionIcon>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
