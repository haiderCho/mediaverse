import React from 'react';
import { PageId } from '../types';
import { useLandingDesign } from '../hooks/useLandingDesign';
import DesignToggle from '../components/DesignToggle';
import BentoGridLanding from '../components/landing/BentoGridLanding';
import OrbitalRingLanding from '../components/landing/OrbitalRingLanding';
import TerminalLanding from '../components/landing/TerminalLanding';
import FloatingCardsLanding from '../components/landing/FloatingCardsLanding';
import HexGridLanding from '../components/landing/HexGridLanding';
import ArchiveLanding from '../components/landing/ArchiveLanding';
import AtelierLanding from '../components/landing/AtelierLanding';
import FrequencyLanding from '../components/landing/FrequencyLanding';

interface LandingPageProps {
  onNavigate: (id: PageId) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { design, setDesign } = useLandingDesign();

  // Render alternate designs
  if (design === 'bento') {
    return (
      <>
        <DesignToggle currentDesign={design} onSelect={setDesign} />
        <BentoGridLanding onNavigate={onNavigate} />
      </>
    );
  }

  if (design === 'orbital') {
    return (
      <>
        <DesignToggle currentDesign={design} onSelect={setDesign} />
        <OrbitalRingLanding onNavigate={onNavigate} />
      </>
    );
  }

  if (design === 'terminal') {
    return (
      <>
        <DesignToggle currentDesign={design} onSelect={setDesign} />
        <TerminalLanding onNavigate={onNavigate} />
      </>
    );
  }

  if (design === 'floating-cards') {
    return (
      <>
        <DesignToggle currentDesign={design} onSelect={setDesign} />
        <FloatingCardsLanding onNavigate={onNavigate} />
      </>
    );
  }

  if (design === 'archive') {
    return (
      <>
        <DesignToggle currentDesign={design} onSelect={setDesign} />
        <ArchiveLanding onNavigate={onNavigate} />
      </>
    );
  }

  if (design === 'atelier') {
    return (
      <>
        <DesignToggle currentDesign={design} onSelect={setDesign} />
        <AtelierLanding onNavigate={onNavigate} />
      </>
    );
  }

  if (design === 'frequency') {
    return (
      <>
        <DesignToggle currentDesign={design} onSelect={setDesign} />
        <FrequencyLanding onNavigate={onNavigate} />
      </>
    );
  }

  // Default: Hex Grid (original design)
  return (
    <>
      <DesignToggle currentDesign={design} onSelect={setDesign} />
      <HexGridLanding onNavigate={onNavigate} />
    </>
  );
};

export default LandingPage;