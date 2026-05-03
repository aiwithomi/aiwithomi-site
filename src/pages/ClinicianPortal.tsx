import { usePortalAuth } from '@/hooks/usePortalAuth';
import { PortalLayout } from './portal/PortalLayout';
import { LoginPage } from './portal/LoginPage';
import { ChatPage } from './portal/ChatPage';

export function ClinicianPortal() {
  const auth = usePortalAuth('clinician');

  if (!auth.user || !auth.token) {
    return (
      <LoginPage
        role="clinician"
        onLogin={auth.login}
        onRegister={auth.register}
      />
    );
  }

  return (
    <PortalLayout role="clinician" user={auth.user} onLogout={auth.logout}>
      <ChatPage user={auth.user} token={auth.token} />
    </PortalLayout>
  );
}
