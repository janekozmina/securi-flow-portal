import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Filter } from 'lucide-react';

interface FiltersSheetProps {
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
}

export default function FiltersSheet({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}: FiltersSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[400px]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="dateFrom">Date From</Label>
            <Input
              id="dateFrom"
              type="text"
              placeholder="DD.MM.YYYY"
              value={dateFrom}
              onChange={(e) => onDateFromChange(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="dateTo">Date To</Label>
            <Input
              id="dateTo"
              type="text"
              placeholder="DD.MM.YYYY"
              value={dateTo}
              onChange={(e) => onDateToChange(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <Button className="w-full">Apply Filters</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
