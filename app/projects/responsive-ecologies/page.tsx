import { PageNavIndicator } from '@/components/PageNavIndicator';
import PracticeAnchor from '@/components/PracticeAnchor';
import ResponsiveEcologiesProjectHeader from './ProjectHeader';
import ArtifactOrigins from './components/ArtifactOrigins';
import ConfidenceModel from './components/ConfidenceModel';
import DecisionHierarchy from './components/DecisionHierarchy';
import DecisionProblem from './components/DecisionProblem';
import EcologicalFoundation from './components/EcologicalFoundation';
import DomainAtlas from './components/DomainAtlas';
import EvidenceLineage from './components/EvidenceLineage';
import HeroLandscape from './components/HeroLandscape';
import ProjectFooter from './components/ProjectFooter';
import ProjectFrame from './components/ProjectFrame';
import ProductExperience from './components/ProductExperience';
import RecoveryModel from './components/RecoveryModel';
import StewardshipPrinciples from './components/StewardshipPrinciples';
import SystemLoop from './components/SystemLoop';
import { sectionNavigation } from './content';

export default function ResponsiveEcologiesPage() {
  return (
    <div className="responsive-ecologies-root min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-emerald-200/50">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .responsive-ecologies-root,
          .responsive-ecologies-root * {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      <a
        href="#responsive-ecologies-hero"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
      >
        Skip to Responsive Ecologies content
      </a>
      <PageNavIndicator sections={[...sectionNavigation]} showDotsOnDesktop />
      <ResponsiveEcologiesProjectHeader />
      <HeroLandscape />
      <ProjectFrame />
      <ArtifactOrigins />
      <EcologicalFoundation />
      <DecisionProblem />
      <DecisionHierarchy />
      <StewardshipPrinciples />
      <SystemLoop />
      <ProductExperience />
      <DomainAtlas />
      <ConfidenceModel />
      <RecoveryModel />
      <EvidenceLineage />
      <PracticeAnchor />
      <ProjectFooter />
    </div>
  );
}
