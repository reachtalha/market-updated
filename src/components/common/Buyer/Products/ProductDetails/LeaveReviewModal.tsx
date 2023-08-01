import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

type LeaveReviewModalProps = {
  trigger: ReactNode
}

export default function LeaveReviewModal({ trigger }:LeaveReviewModalProps) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a review</DialogTitle>
          <DialogDescription>
            <form className="mt-4">
              <div className="flex flex-col gap-2">
                <Label  htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Write here..." />
              </div>
              <div className="flex justify-end mt-8">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}