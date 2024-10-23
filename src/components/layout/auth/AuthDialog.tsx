import { Dialog, DialogContent } from '@/components/common/DialogElements';
import AuthCard from './AuthCard';

export function AuthDialog() {
  return (
    <Dialog>
      <DialogContent className='sm:max-w-[425px]'>
        <AuthCard />
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
