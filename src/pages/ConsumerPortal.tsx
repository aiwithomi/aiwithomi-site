import { usePortalAuth } from '@/hooks/usePortalAuth';
import { PortalLayout } from './portal/PortalLayout';
import { LoginPage } from './portal/LoginPage';
import { ChatPage } from './portal/ChatPage';

export function ConsumerPortal() {
  const auth = usePortalAuth('consumer');

  if (!auth.user || !auth.token) {
    return (
      <LoginPage
        role="consumer"
        onLogin={auth.login}
        onRegister={auth.register}
      />
    );
  }

  return (
    <PortalLayout role="consumer" user={auth.user} onLogout={auth.logout}>
      <ChatPage user={auth.user} token={auth.token} />
    </PortalLayout>
  );
}
