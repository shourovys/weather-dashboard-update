import { Dialog, DialogContent } from '@/components/common/DialogElements';
import useAuth from '@/hooks/useAuth';
import AuthCard from './AuthCard';

export function AuthDialog() {
  const { isAuthModalOpen, openAuthDialog } = useAuth();
  return (
    <Dialog open={isAuthModalOpen} onOpenChange={openAuthDialog}>
      <DialogContent className='sm:max-w-[425px]'>
        <AuthCard />
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
