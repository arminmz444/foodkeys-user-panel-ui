import React, { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { PiCalendarBlank } from 'react-icons/pi';
import './jalaliDatePickerStyles.css';
import 'react-multi-date-picker/styles/layouts/mobile.css';
export default function JalaliDatePicker({
  selected,
  onChange,
  onBlur,
  dateFormat,
  maxDate,
  placeholderText,
  inputProps,
  popperPlacement,
  className,
}) {
  const [value, setValue] = useState(selected);

  // Custom input styles for the input box
  const customInputStyles = {
    borderRadius: '0.375rem', // Matches the rounded corners
    border: '1px solid #d1d5db', // Light border
    padding: '8px 12px', // Padding for input
    backgroundColor: 'white',
    height: '40px', // Slightly taller input to match
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '1rem',
    color: '#6b7280', // Light gray color for text
    width: '100%', // Full width to fill remaining space
    transition: 'box-shadow 0.2s ease-in-out, border-color 0.2s',
  };

  // Focus styles for input
  const customInputFocusStyles = {
    borderColor: '#0c8af8', // Blue focus border
    boxShadow: '0 0 5px #0074d9',
  };

  // @ts-ignore
  return (
    <div style={{ width: '100%', direction: 'rtl' }}>
      {/* Label positioned at the top */}
      <label
        style={{
          display: 'block',
          marginBottom: '4px',
          fontSize: '14px',
          color: '#4B5563', // Slightly dark gray
        }}
      >
        {placeholderText || 'تاریخ تاسیس'}
      </label>

      <DatePicker
        className={className}
        value={selected}
        // @ts-ignore
        onChange={(e) => {
          //   console.log(e);
          //   console.log();
          if (e) {
            //   let year = e.year;
            //   let month = e.month.number;
            //   let day = e.day;
            //   let dateStr = year + '-' + month + '-' + day + 'T' + '13:06:11';
            onChange(e?.toDate().toISOString());
          }
        }}
        mobileButtons={[
          {
            label: 'امروز',
            // @ts-ignore
            type: 'button',
            className: 'rmdp-button rmdp-action-button',
            // @ts-ignore
            onClick: () => onChange(new Date().toISOString()),
          },
        ]}
        onBlur={onBlur}
        dateFormat={dateFormat}
        maxDate={maxDate}
        inputProps={inputProps}
        popperPlacement={popperPlacement}
        placeholderText={placeholderText}
        inputClass="custom-input"
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        style={{ width: '100%' }}
        containerStyle={{
          width: '100%',
        }}
        render={(value, openCalendar) => (
          <div
            style={{
              ...customInputStyles,
              borderColor: '1px solid #d1d5db',
            }}
            onClick={openCalendar}
            onFocus={(e) => {
              e.currentTarget.style.borderColor =
                customInputFocusStyles.borderColor;
              e.currentTarget.style.boxShadow =
                customInputFocusStyles.boxShadow;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* The date text */}
            <span>
              {value
                ? value
                : placeholderText
                ? placeholderText
                : 'تاریخ تاسیس'}
            </span>
            {/* Calendar Icon */}
            <PiCalendarBlank className="h-5 w-5 text-gray-500" />
          </div>
        )}
      />
    </div>
  );
}
