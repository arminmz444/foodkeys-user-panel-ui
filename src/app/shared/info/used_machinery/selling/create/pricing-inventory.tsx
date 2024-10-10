import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import ProductAvailability from '@/app/shared/ecommerce/product/create/product-availability';
import InventoryTracing from '@/app/shared/ecommerce/product/create/inventory-tracking';
import ProductPricing from '@/app/shared/ecommerce/product/create/product-pricing';

interface PricingInventoryProps {
  className?: string;
}

export default function PricingInventory({ className }: PricingInventoryProps) {
  return (
    <>
      <FormGroup
        title="قیمت گذاری"
        description="قیمت محصول خود را اینجا وارد کنید"
        className={cn(className)}
      >
        <ProductPricing />
      </FormGroup>
      <FormGroup
        title="رهگیری مالی"
        description="جزییات مالی و دارایی خود را اینجا وارد کنید"
        className={cn(className)}
      >
        <InventoryTracing />
      </FormGroup>
      <FormGroup
        title="موجود"
        description="اطلاعات محصول خود را اینجا وارد کنید"
        className={cn(className)}
      >
        <ProductAvailability />
      </FormGroup>
    </>
  );
}
