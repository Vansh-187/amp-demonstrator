import { useState } from 'react'
import AMPSelector from './AMPSelector'
import StructureViewer from './StructureViewer'
import AnalysisViewer from './AnalysisViewer'
import MDViewer from './MDViewer'

export default function App() {
  const [selectedAMP, setSelectedAMP] = useState(null)
  const [module, setModule] = useState(1)

  if (!selectedAMP) {
    return <AMPSelector onSelect={(amp) => { setSelectedAMP(amp); setModule(1) }} />
  }
  if (module === 1) {
    return <StructureViewer amp={selectedAMP} onBack={() => setSelectedAMP(null)} onNext={() => setModule(2)} />
  }
  if (module === 2) {
    return <AnalysisViewer amp={selectedAMP} onBack={() => setModule(1)} onNext={() => setModule(3)} />
  }
  if (module === 3) {
    return <MDViewer amp={selectedAMP} onBack={() => setModule(2)} />
  }
}