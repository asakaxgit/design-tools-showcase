'use client'

import { Stage, Layer, Rect, Circle, Star, Text, Transformer } from 'react-konva'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Konva from 'konva'

interface Shape {
  id: string
  type: 'rect' | 'circle' | 'star'
  x: number
  y: number
  fill: string
  width?: number
  height?: number
  radius?: number
  numPoints?: number
  innerRadius?: number
  outerRadius?: number
}

export default function KonvaShowcase() {
  const [rectColor, setRectColor] = useState('#4299e1')
  const [circlePos, setCirclePos] = useState({ x: 100, y: 200 })
  const [starRotation, setStarRotation] = useState(0)
  
  // State for text rendering example
  const [text1, setText1] = useState('Hello from Konva!')
  const [text2, setText2] = useState('Styled and positioned text')
  
  // State for transform example
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [shapes, setShapes] = useState<Shape[]>([
    { id: 'rect1', type: 'rect', x: 50, y: 50, width: 100, height: 80, fill: '#4299e1' },
    { id: 'circle1', type: 'circle', x: 250, y: 90, radius: 40, fill: '#48bb78' },
    { id: 'star1', type: 'star', x: 400, y: 90, numPoints: 5, innerRadius: 20, outerRadius: 40, fill: '#f6ad55' }
  ])
  
  const transformerRef = useRef<Konva.Transformer>(null)
  const shapeRefs = useRef<{ [key: string]: Konva.Shape }>({})
  const stageRef = useRef<Konva.Stage>(null)

  // Update transformer when selection changes
  useEffect(() => {
    if (selectedId && transformerRef.current) {
      const selectedNode = shapeRefs.current[selectedId]
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode])
        transformerRef.current.getLayer()?.batchDraw()
      }
    }
  }, [selectedId])

  const handleSelect = (id: string) => {
    setSelectedId(id)
  }

  const handleDeselect = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    // Deselect when clicking on empty area
    const clickedOnEmpty = e.target === e.target.getStage()
    if (clickedOnEmpty) {
      setSelectedId(null)
    }
  }

  // Layer management functions
  const moveToFront = (id: string) => {
    setShapes(prevShapes => {
      const index = prevShapes.findIndex(s => s.id === id)
      if (index === -1) return prevShapes
      const shape = prevShapes[index]
      const newShapes = [...prevShapes.slice(0, index), ...prevShapes.slice(index + 1), shape]
      return newShapes
    })
  }

  const moveToBack = (id: string) => {
    setShapes(prevShapes => {
      const index = prevShapes.findIndex(s => s.id === id)
      if (index === -1) return prevShapes
      const shape = prevShapes[index]
      const newShapes = [shape, ...prevShapes.slice(0, index), ...prevShapes.slice(index + 1)]
      return newShapes
    })
  }

  const moveUp = (id: string) => {
    setShapes(prevShapes => {
      const index = prevShapes.findIndex(s => s.id === id)
      if (index === -1 || index === prevShapes.length - 1) return prevShapes
      const newShapes = [...prevShapes]
      ;[newShapes[index], newShapes[index + 1]] = [newShapes[index + 1], newShapes[index]]
      return newShapes
    })
  }

  const moveDown = (id: string) => {
    setShapes(prevShapes => {
      const index = prevShapes.findIndex(s => s.id === id)
      if (index === -1 || index === 0) return prevShapes
      const newShapes = [...prevShapes]
      ;[newShapes[index], newShapes[index - 1]] = [newShapes[index - 1], newShapes[index]]
      return newShapes
    })
  }

  // Export functions
  const exportCanvas = (scale: number, fileName: string) => {
    if (!stageRef.current) return
    
    const uri = stageRef.current.toDataURL({
      pixelRatio: scale
    })
    
    const link = document.createElement('a')
    link.download = fileName
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportForPreview = () => {
    exportCanvas(1, 'canvas-preview.png')
  }

  const exportForPrint = () => {
    exportCanvas(3, 'canvas-print.png')
  }

  const renderShape = (shape: Shape) => {
    const isSelected = shape.id === selectedId
    const commonProps = {
      x: shape.x,
      y: shape.y,
      fill: shape.fill,
      draggable: true,
      onClick: () => handleSelect(shape.id),
      onTap: () => handleSelect(shape.id),
      ref: (node: Konva.Shape | null) => {
        if (node) {
          shapeRefs.current[shape.id] = node
        }
      },
      stroke: isSelected ? '#0066cc' : undefined,
      strokeWidth: isSelected ? 2 : 0
    }

    switch (shape.type) {
      case 'rect':
        return <Rect key={shape.id} {...commonProps} width={shape.width!} height={shape.height!} />
      case 'circle':
        return <Circle key={shape.id} {...commonProps} radius={shape.radius!} />
      case 'star':
        return <Star key={shape.id} {...commonProps} numPoints={shape.numPoints!} innerRadius={shape.innerRadius!} outerRadius={shape.outerRadius!} />
      default:
        return null
    }
  }

  return (
    <main className="container">
      <div className="header">
        <h1>Konva (react-konva) Showcase</h1>
        <p className="subtitle">Canvas-based 2D graphics library with React integration</p>
      </div>

      <section className="showcase-section">
        <h2>Overview</h2>
        <p>
          Konva is a 2D canvas library that enables high-performance drawing and animation. 
          react-konva provides React components for easy integration.
        </p>
        
        <div className="feature-list">
          <div className="feature-item">✅ React integration via react-konva</div>
          <div className="feature-item">✅ High performance with canvas rendering</div>
          <div className="feature-item">✅ Event handling (click, drag, hover)</div>
          <div className="feature-item">✅ Animations and transformations</div>
        </div>
      </section>

      <section className="showcase-section">
        <h2>Interactive Examples</h2>
        
        <div className="examples-grid">
        <div className="example">
          <h3>1. Basic Shapes</h3>
          <p>Rectangle, circle, and star with different colors and properties</p>
          <div className="canvas-container">
            <Stage width={600} height={300}>
              <Layer>
                <Rect
                  x={50}
                  y={50}
                  width={100}
                  height={80}
                  fill={rectColor}
                  shadowBlur={5}
                  cornerRadius={10}
                  onMouseEnter={() => setRectColor('#2b6cb0')}
                  onMouseLeave={() => setRectColor('#4299e1')}
                />
                <Circle
                  x={250}
                  y={90}
                  radius={40}
                  fill="#48bb78"
                  shadowBlur={5}
                />
                <Star
                  x={400}
                  y={90}
                  numPoints={5}
                  innerRadius={20}
                  outerRadius={40}
                  fill="#f6ad55"
                  shadowBlur={5}
                />
              </Layer>
            </Stage>
          </div>
          <p className="example-note">Hover over the blue rectangle to see color change</p>
        </div>

        <div className="example">
          <h3>2. Draggable Elements</h3>
          <p>Drag the circle to move it around the canvas</p>
          <div className="canvas-container">
            <Stage width={600} height={300}>
              <Layer>
                <Text
                  text="Drag me!"
                  x={circlePos.x - 30}
                  y={circlePos.y - 60}
                  fontSize={16}
                  fill="#2d3748"
                />
                <Circle
                  x={circlePos.x}
                  y={circlePos.y}
                  radius={50}
                  fill="#9f7aea"
                  shadowBlur={10}
                  draggable
                  onDragEnd={(e) => {
                    setCirclePos({
                      x: e.target.x(),
                      y: e.target.y(),
                    })
                  }}
                />
              </Layer>
            </Stage>
          </div>
        </div>

        <div className="example">
          <h3>3. Rotation & Animation</h3>
          <p>Click the star to rotate it</p>
          <div className="canvas-container clickable">
            <Stage width={600} height={300}>
              <Layer>
                <Star
                  x={300}
                  y={150}
                  numPoints={6}
                  innerRadius={40}
                  outerRadius={70}
                  fill="#ed8936"
                  shadowBlur={10}
                  rotation={starRotation}
                  onClick={() => setStarRotation(prev => prev + 45)}
                  onTap={() => setStarRotation(prev => prev + 45)}
                />
              </Layer>
            </Stage>
          </div>
          <p className="example-note">Current rotation: {starRotation}°</p>
        </div>

        <div className="example">
          <h3>4. Text Rendering</h3>
          <p>Konva supports text rendering with various styling options. Edit the text below:</p>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>First Text:</label>
              <input
                type="text"
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  padding: '0.5rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Second Text:</label>
              <input
                type="text"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  padding: '0.5rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>
          <div className="canvas-container">
            <Stage width={600} height={200}>
              <Layer>
                <Text
                  text={text1}
                  x={50}
                  y={50}
                  fontSize={32}
                  fontFamily="Arial"
                  fill="#2d3748"
                />
                <Text
                  text={text2}
                  x={50}
                  y={100}
                  fontSize={18}
                  fontStyle="italic"
                  fill="#4299e1"
                />
              </Layer>
            </Stage>
          </div>
        </div>
        </div>
      </section>

      <section className="showcase-section">
        
        <div className="examples-grid">
        <div className="example">
          <h3>5. Transform with Handles (Rotate & Resize)</h3>
          <p>Click on a shape to select it, then use the handles to rotate and resize</p>
          <div className="canvas-container">
            <Stage 
              width={600} 
              height={300} 
              onMouseDown={handleDeselect}
              onTouchStart={handleDeselect}
              ref={stageRef}
            >
              <Layer>
                {shapes.map(renderShape)}
                <Transformer
                  ref={transformerRef}
                  boundBoxFunc={(oldBox, newBox) => {
                    // Limit resize
                    if (newBox.width < 5 || newBox.height < 5) {
                      return oldBox
                    }
                    return newBox
                  }}
                />
              </Layer>
            </Stage>
          </div>
          <p className="example-note">
            {selectedId ? `Selected: ${selectedId}` : 'Click on a shape to select it'}
          </p>
        </div>

        <div className="example">
          <h3>6. Layer Management (Reordering)</h3>
          <p>Control the stacking order of shapes with layer management controls</p>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Selected Shape:</strong> {selectedId || 'None'}
            </div>
            <div className="layer-controls">
              <button 
                className="layer-button" 
                onClick={() => selectedId && moveToFront(selectedId)}
                disabled={!selectedId}
              >
                ⬆️ To Front
              </button>
              <button 
                className="layer-button" 
                onClick={() => selectedId && moveUp(selectedId)}
                disabled={!selectedId}
              >
                ↑ Move Up
              </button>
              <button 
                className="layer-button" 
                onClick={() => selectedId && moveDown(selectedId)}
                disabled={!selectedId}
              >
                ↓ Move Down
              </button>
              <button 
                className="layer-button" 
                onClick={() => selectedId && moveToBack(selectedId)}
                disabled={!selectedId}
              >
                ⬇️ To Back
              </button>
            </div>
          </div>
          <div style={{ background: '#f7fafc', padding: '1rem', borderRadius: '6px', marginTop: '1rem' }}>
            <strong>Layer Order (bottom to top):</strong>
            <ol style={{ marginTop: '0.5rem', paddingLeft: '2rem' }}>
              {shapes.map((shape, index) => (
                <li key={shape.id} style={{ padding: '0.25rem 0' }}>
                  {shape.id} ({shape.type}) {shape.id === selectedId && '← Selected'}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="example">
          <h3>7. Export Canvas (Multiple Sizes)</h3>
          <p>Export the canvas at different resolutions for preview and print</p>
          <div className="export-controls">
            <button className="export-button preview" onClick={exportForPreview}>
              📥 Export for Preview (1x)
              <span className="button-subtitle">For web display (600x300px)</span>
            </button>
            <button className="export-button print" onClick={exportForPrint}>
              🖨️ Export for Print (3x)
              <span className="button-subtitle">High resolution (1800x900px)</span>
            </button>
          </div>
          <p className="example-note">
            Preview export is at 1x scale (web quality), Print export is at 3x scale (high resolution)
          </p>
        </div>
        </div>
      </section>

      <section className="showcase-section">
        <h2>Evaluation Summary</h2>
        
        <div className="evaluation">
          <div className="eval-item">
            <h3>Usability</h3>
            <div className="rating">★★★★☆</div>
            <p>React-friendly API with intuitive component structure. Good documentation.</p>
          </div>

          <div className="eval-item">
            <h3>Performance</h3>
            <div className="rating">★★★★★</div>
            <p>Excellent performance with canvas rendering. Handles many objects smoothly.</p>
          </div>

          <div className="eval-item">
            <h3>Features</h3>
            <div className="rating">★★★★☆</div>
            <p>Comprehensive shape library, events, animations, and transformations built-in.</p>
          </div>

          <div className="eval-item">
            <h3>Integration</h3>
            <div className="rating">★★★★★</div>
            <p>Seamless React integration. TypeScript support available. Easy to use with Next.js.</p>
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <h2>Use Cases</h2>
        <ul className="use-case-list">
          <li>Interactive diagrams and flowcharts</li>
          <li>Data visualizations and charts</li>
          <li>Image editors and drawing applications</li>
          <li>Game development</li>
          <li>Interactive infographics</li>
        </ul>
      </section>

      <div className="navigation">
        <Link href="/" className="nav-button">← Back to Home</Link>
      </div>
    </main>
  )
}
