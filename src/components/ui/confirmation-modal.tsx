// import React from 'react';
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogFooter,
//     Button,
//     Text
// } from 'rizzui';
// import { AlertCircle } from 'lucide-react';
// import { Title } from "@/components/ui/compatible-components";
// interface ConfirmationModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onConfirm: () => void;
//     title: string;
//     description: string;
//     confirmText?: string;
//     cancelText?: string;
//     isLoading?: boolean;
//     variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info';
// }
//
// export default function ConfirmationModal({
//                                               isOpen,
//                                               onClose,
//                                               onConfirm,
//                                               title,
//                                               description,
//                                               confirmText = 'تایید',
//                                               cancelText = 'انصراف',
//                                               isLoading = false,
//                                               variant = 'primary'
//                                           }: ConfirmationModalProps) {
//     return (
//         <Dialog isOpen={isOpen} onClose={onClose}>
//             <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                     <div className="flex items-center">
//                         {variant === 'danger' && (
//                             <div className="mr-2 rounded-full bg-red-100 p-2 text-red-600">
//                                 <AlertCircle className="h-5 w-5" />
//                             </div>
//                         )}
//                         <Title className="text-xl">{title}</Title>
//                     </div>
//                 </DialogHeader>
//
//                 <div className="my-6">
//                     <Text>{description}</Text>
//                 </div>
//
//                 <DialogFooter>
//                     <Button
//                         variant="outline"
//                         onClick={onClose}
//                         disabled={isLoading}
//                         className="w-full sm:w-auto"
//                     >
//                         {cancelText}
//                     </Button>
//                     <Button
//                         onClick={onConfirm}
//                         disabled={isLoading}
//                         isLoading={isLoading}
//                         color={variant}
//                         className="w-full sm:w-auto"
//                     >
//                         {confirmText}
//                     </Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// }
'use client';

import React from 'react';
import { Modal, Button, Text, ActionIcon } from 'rizzui';
import { AlertCircle, X as CloseIcon } from 'lucide-react';
import { Title } from '@/components/ui/compatible-components';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info';
}

export default function ConfirmationModal({
                                              isOpen,
                                              onClose,
                                              onConfirm,
                                              title,
                                              description,
                                              confirmText = 'تایید',
                                              cancelText = 'انصراف',
                                              isLoading = false,
                                              variant = 'primary'
                                          }: ConfirmationModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            // Center the modal and limit its width
            className="flex items-center justify-center p-4"
            // The inner container:
            backdropClassName="bg-black bg-opacity-50"
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <div className="flex items-center">
                        {variant === 'danger' && (
                            <div className="mr-3 rounded-full bg-red-100 p-2 text-red-600">
                                <AlertCircle className="h-5 w-5" />
                            </div>
                        )}
                        <Title className="text-lg font-medium">{title}</Title>
                    </div>
                    <ActionIcon
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        <CloseIcon className="h-5 w-5" />
                    </ActionIcon>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                    <Text>{description}</Text>
                </div>

                {/* Footer */}
                <div className="flex justify-end space-x-2 px-6 py-4 border-t">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isLoading}
                        isLoading={isLoading}
                        color={variant}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
