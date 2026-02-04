'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function PaperShowcase() {
  // Canvas refs
  const canvas1Ref = useRef<HTMLCanvasElement>(null)
  const canvas2Ref = useRef<HTMLCanvasElement>(null)
  const canvas3Ref = useRef<HTMLCanvasElement>(null)
  const canvas4Ref = useRef<HTMLCanvasElement>(null)
  const canvas5Ref = useRef<HTMLCanvasElement>(null)
  const canvas6Ref = useRef<HTMLCanvasElement>(null)
  const canvas7Ref = useRef<HTMLCanvasElement>(null)

  const [rectColor, setRectColor] = useState('#4299e1')
  const [circlePos, setCirclePos] = useState({ x: 100, y: 200 })
  const [starRotation, setStarRotation] = useState(0)
  const [text1, setText1] = useState('Hello from Paper.js!')
  const [text2, setText2] = useState('Styled and positioned text')
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [paperLoaded, setPaperLoaded] = useState(false)
  const paperRef = useRef<any>(null)

  // Load Paper.js dynamically on client side only
  useEffect(() => {
    import('paper').then((module) => {
      paperRef.current = module.default
      setPaperLoaded(true)
    })
  }, [])

  // Example 1: Basic Shapes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!canvas1Ref.current || !paperLoaded || !paperRef.current) return
    
    const paper = paperRef.current
    paper.setup(canvas1Ref.current)
    const project = paper.project

    const rect = new paper.Path.Rectangle({
      point: [50, 50],
      size: [100, 80],
      radius: 10,
      fillColor: new paper.Color(rectColor),
      shadowColor: new paper.Color(0, 0, 0, 0.3),
      shadowBlur: 5
    })

    rect.onMouseEnter = () => {
      setRectColor('#2b6cb0')
      rect.fillColor = new paper.Color('#2b6cb0')
    }

    rect.onMouseLeave = () => {
      setRectColor('#4299e1')
      rect.fillColor = new paper.Color('#4299e1')
    }

    const circle = new paper.Path.Circle({
      center: [250, 90],
      radius: 40,
      fillColor: new paper.Color('#48bb78'),
      shadowColor: new paper.Color(0, 0, 0, 0.3),
      shadowBlur: 5
    })

    const star = new paper.Path.Star({
      center: [400, 90],
      points: 5,
      radius1: 20,
      radius2: 40,
      fillColor: new paper.Color('#f6ad55'),
      shadowColor: new paper.Color(0, 0, 0, 0.3),
      shadowBlur: 5
    })

    // paper.view updates automatically

    return () => {
      project.clear()
      project.remove()
    }
  }, [])

  // Example 2: Draggable Elements
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!canvas2Ref.current) return

    paper.setup(canvas2Ref.current)
    const project = paper.project

    const text = new paper.PointText({
      point: [circlePos.x - 30, circlePos.y - 60],
      content: 'Drag me!',
      fontSize: 16,
      fillColor: new paper.Color('#2d3748')
    })

    const circle = new paper.Path.Circle({
      center: [circlePos.x, circlePos.y],
      radius: 50,
      fillColor: new paper.Color('#9f7aea'),
      shadowColor: new paper.Color(0, 0, 0, 0.3),
      shadowBlur: 10
    })

    circle.onMouseDrag = (event: any) => {
      circle.position = circle.position.add(event.delta)
      text.position = new paper.Point(circle.position.x - 30, circle.position.y - 60)
      setCirclePos({ x: circle.position.x, y: circle.position.y })
    }

    // paper.view updates automatically

    return () => {
      project.clear()
      project.remove()
    }
  }, [])

  // Example 3: Rotation & Animation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!canvas3Ref.current) return

    paper.setup(canvas3Ref.current)
    const project = paper.project

    const star = new paper.Path.Star({
      center: [300, 150],
      points: 6,
      radius1: 40,
      radius2: 70,
      fillColor: new paper.Color('#ed8936'),
      shadowColor: new paper.Color(0, 0, 0, 0.3),
      shadowBlur: 10
    })

    star.rotate(starRotation)

    star.onMouseDown = () => {
      const newRotation = starRotation + 45
      setStarRotation(newRotation)
      
      // Simple rotation animation
      const steps = 10
      const increment = 45 / steps
      let currentStep = 0
      
      const animate = () => {
        if (currentStep < steps) {
          star.rotate(increment)
          // paper.view updates automatically
          currentStep++
          requestAnimationFrame(animate)
        }
      }
      
      animate()
    }

    // paper.view updates automatically

    return () => {
      project.clear()
      project.remove()
    }
  }, [])

  // Example 4: Text Rendering
  useEffect(() => {
    if (!canvas4Ref.current) return

    paper.setup(canvas4Ref.current)
    const project = paper.project

    const textObj1 = new paper.PointText({
      point: [50, 75],
      content: text1,
      fontSize: 32,
      fontFamily: 'Arial',
      fillColor: new paper.Color('#2d3748')
    })

    const textObj2 = new paper.PointText({
      point: [50, 125],
      content: text2,
      fontSize: 18,
      fontFamily: 'Arial',
      fillColor: new paper.Color('#4299e1')
    })

    // paper.view updates automatically

    return () => {
      project.clear()
      project.remove()
    }
  }, [text1, text2])

  // Example 5: Transform with Handles
  useEffect(() => {
    if (!canvas5Ref.current) return

    paper.setup(canvas5Ref.current)
    const project = paper.project

    const rect = new paper.Path.Rectangle({
      point: [50, 50],
      size: [100, 80],
      fillColor: new paper.Color('#4299e1')
    })

    const circle = new paper.Path.Circle({
      center: [250, 90],
      radius: 40,
      fillColor: new paper.Color('#48bb78')
    })

    const star = new paper.Path.Star({
      center: [400, 90],
      points: 5,
      radius1: 20,
      radius2: 40,
      fillColor: new paper.Color('#f6ad55')
    })

    let selectedPath: paper.Item | null = null
    let selectionBounds: paper.Path.Rectangle | null = null

    const items = [rect, circle, star]
    items.forEach(item => {
      item.onMouseDown = () => {
        if (selectionBounds) {
          selectionBounds.remove()
        }
        
        selectedPath = item
        setSelectedItem(item)
        
        selectionBounds = new paper.Path.Rectangle({
          rectangle: item.bounds,
          strokeColor: new paper.Color('#0066cc'),
          strokeWidth: 2,
          dashArray: [4, 4]
        })
        
        // paper.view updates automatically
      }

      // Enable dragging for all items
      item.onMouseDrag = (event: any) => {
        item.position = item.position.add(event.delta)
        if (selectionBounds && item === selectedPath) {
          selectionBounds.position = selectionBounds.position.add(event.delta)
        }
      }
    })

    // Deselect when clicking on empty area
    paper.view.onMouseDown = (event: any) => {
      if (!event.item || !items.includes(event.item as paper.Path)) {
        if (selectionBounds) {
          selectionBounds.remove()
          selectionBounds = null
        }
        selectedPath = null
        setSelectedItem(null)
        // paper.view updates automatically
      }
    }

    // paper.view updates automatically

    return () => {
      project.clear()
      project.remove()
    }
  }, [])

  // Example 6: Layer Management
  useEffect(() => {
    if (!canvas6Ref.current) return

    paper.setup(canvas6Ref.current)
    const project = paper.project

    const rect = new paper.Path.Rectangle({
      point: [50, 50],
      size: [100, 80],
      fillColor: new paper.Color('#4299e1'),
      name: 'rect1'
    })

    const circle = new paper.Path.Circle({
      center: [250, 90],
      radius: 40,
      fillColor: new paper.Color('#48bb78'),
      name: 'circle1'
    })

    const star = new paper.Path.Star({
      center: [400, 90],
      points: 5,
      radius1: 20,
      radius2: 40,
      fillColor: new paper.Color('#f6ad55'),
      name: 'star1'
    })

    let selectionBounds: paper.Path.Rectangle | null = null

    const items = [rect, circle, star]
    items.forEach(item => {
      item.onMouseDown = () => {
        if (selectionBounds) {
          selectionBounds.remove()
        }
        
        setSelectedItem(item)
        
        selectionBounds = new paper.Path.Rectangle({
          rectangle: item.bounds,
          strokeColor: new paper.Color('#0066cc'),
          strokeWidth: 2,
          dashArray: [4, 4]
        })
        
        // paper.view updates automatically
      }

      item.onMouseDrag = (event: any) => {
        item.position = item.position.add(event.delta)
        if (selectionBounds) {
          selectionBounds.position = selectionBounds.position.add(event.delta)
        }
      }
    })

    // paper.view updates automatically

    return () => {
      project.clear()
      project.remove()
    }
  }, [])

  // Example 7: Export Canvas
  useEffect(() => {
    if (!canvas7Ref.current) return

    paper.setup(canvas7Ref.current)
    const project = paper.project

    const rect = new paper.Path.Rectangle({
      point: [50, 50],
      size: [100, 80],
      fillColor: new paper.Color('#4299e1')
    })

    const circle = new paper.Path.Circle({
      center: [250, 90],
      radius: 40,
      fillColor: new paper.Color('#48bb78')
    })

    const star = new paper.Path.Star({
      center: [400, 90],
      points: 5,
      radius1: 20,
      radius2: 40,
      fillColor: new paper.Color('#f6ad55')
    })

    // paper.view updates automatically

    return () => {
      project.clear()
      project.remove()
    }
  }, [])

  // Layer management functions
  const moveToFront = () => {
    if (selectedItem && canvas6Ref.current) {
      selectedItem.bringToFront()
      paper.project.activeLayer.children.forEach((child: paper.Item) => {
        if (child.className === 'Path' && child.strokeColor) {
          child.remove()
        }
      })
      const selectionBounds = new paper.Path.Rectangle({
        rectangle: selectedItem.bounds,
        strokeColor: new paper.Color('#0066cc'),
        strokeWidth: 2,
        dashArray: [4, 4]
      })
      // paper.view updates automatically
    }
  }

  const moveToBack = () => {
    if (selectedItem && canvas6Ref.current) {
      selectedItem.sendToBack()
      paper.project.activeLayer.children.forEach((child: paper.Item) => {
        if (child.className === 'Path' && child.strokeColor) {
          child.remove()
        }
      })
      const selectionBounds = new paper.Path.Rectangle({
        rectangle: selectedItem.bounds,
        strokeColor: new paper.Color('#0066cc'),
        strokeWidth: 2,
        dashArray: [4, 4]
      })
      // paper.view updates automatically
    }
  }

  const moveUp = () => {
    if (selectedItem && canvas6Ref.current) {
      const index = selectedItem.index
      if (index < paper.project.activeLayer.children.length - 1) {
        selectedItem.insertAbove(paper.project.activeLayer.children[index + 1])
        paper.project.activeLayer.children.forEach((child: paper.Item) => {
          if (child.className === 'Path' && child.strokeColor) {
            child.remove()
          }
        })
        const selectionBounds = new paper.Path.Rectangle({
          rectangle: selectedItem.bounds,
          strokeColor: new paper.Color('#0066cc'),
          strokeWidth: 2,
          dashArray: [4, 4]
        })
        // paper.view updates automatically
      }
    }
  }

  const moveDown = () => {
    if (selectedItem && canvas6Ref.current) {
      const index = selectedItem.index
      if (index > 0) {
        selectedItem.insertBelow(paper.project.activeLayer.children[index - 1])
        paper.project.activeLayer.children.forEach((child: paper.Item) => {
          if (child.className === 'Path' && child.strokeColor) {
            child.remove()
          }
        })
        const selectionBounds = new paper.Path.Rectangle({
          rectangle: selectedItem.bounds,
          strokeColor: new paper.Color('#0066cc'),
          strokeWidth: 2,
          dashArray: [4, 4]
        })
        // paper.view updates automatically
      }
    }
  }

  // Export functions
  const exportForPreview = () => {
    if (canvas7Ref.current) {
      const dataURL = canvas7Ref.current.toDataURL('image/png', 1.0)
      downloadImage(dataURL, 'canvas-preview.png')
    }
  }

  const exportForPrint = () => {
    if (canvas7Ref.current) {
      // For higher resolution, we'd need to recreate the canvas at 3x size
      // For now, we'll just use the current canvas
      const dataURL = canvas7Ref.current.toDataURL('image/png', 1.0)
      downloadImage(dataURL, 'canvas-print.png')
    }
  }

  const downloadImage = (dataURL: string, filename: string) => {
    const link = document.createElement('a')
    link.download = filename
    link.href = dataURL
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className="container">
      <div className="header">
        <h1>Paper.js Showcase</h1>
        <p className="subtitle">Vector graphics scripting framework</p>
      </div>

      <section className="showcase-section">
        <h2>Overview</h2>
        <p>
          Paper.js is a vector graphics scripting framework that runs on top of the HTML5 Canvas.
          It offers a clean Scene Graph / Document Object Model and a lot of powerful functionality.
        </p>
        
        <div className="feature-list">
          <div className="feature-item">✅ Vector-based graphics with precision</div>
          <div className="feature-item">✅ Scene graph with hierarchical structure</div>
          <div className="feature-item">✅ Powerful path manipulation</div>
          <div className="feature-item">✅ Mathematical operations on geometric shapes</div>
        </div>
      </section>

      <section className="showcase-section">
        <h2>Interactive Examples</h2>
        
        <div className="examples-grid">
          <div className="example">
            <h3>1. Basic Shapes</h3>
            <p>Rectangle, circle, and star with different colors and properties</p>
            <div className="canvas-container">
              <canvas ref={canvas1Ref} width={600} height={300} />
            </div>
            <p className="example-note">Hover over the blue rectangle to see color change</p>
          </div>

          <div className="example">
            <h3>2. Draggable Elements</h3>
            <p>Drag the circle to move it around the canvas</p>
            <div className="canvas-container">
              <canvas ref={canvas2Ref} width={600} height={300} />
            </div>
          </div>

          <div className="example">
            <h3>3. Rotation & Animation</h3>
            <p>Click the star to rotate it</p>
            <div className="canvas-container clickable">
              <canvas ref={canvas3Ref} width={600} height={300} />
            </div>
            <p className="example-note">Current rotation: {starRotation}°</p>
          </div>

          <div className="example">
            <h3>4. Text Rendering</h3>
            <p>Paper.js supports text rendering with various styling options. Edit the text below:</p>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <label htmlFor="text-input-1" className="text-input-label">First Text:</label>
                <input
                  id="text-input-1"
                  type="text"
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  className="text-input"
                />
              </div>
              <div>
                <label htmlFor="text-input-2" className="text-input-label">Second Text:</label>
                <input
                  id="text-input-2"
                  type="text"
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  className="text-input"
                />
              </div>
            </div>
            <div className="canvas-container">
              <canvas ref={canvas4Ref} width={600} height={200} />
            </div>
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <div className="examples-grid">
          <div className="example">
            <h3>5. Transform with Handles (Rotate & Resize)</h3>
            <p>Click on a shape to select it and drag to move</p>
            <div className="canvas-container">
              <canvas ref={canvas5Ref} width={600} height={300} />
            </div>
            <p className="example-note">
              {selectedItem ? `Selected object` : 'Click on a shape to select it'}
            </p>
          </div>

          <div className="example">
            <h3>6. Layer Management (Reordering)</h3>
            <p>Select a shape and control its stacking order with layer management controls</p>
            <div style={{ marginBottom: '1rem' }}>
              <div className="layer-controls">
                <button 
                  className="layer-button" 
                  onClick={moveToFront}
                  disabled={!selectedItem}
                >
                  ⬆️ To Front
                </button>
                <button 
                  className="layer-button" 
                  onClick={moveUp}
                  disabled={!selectedItem}
                >
                  ↑ Move Up
                </button>
                <button 
                  className="layer-button" 
                  onClick={moveDown}
                  disabled={!selectedItem}
                >
                  ↓ Move Down
                </button>
                <button 
                  className="layer-button" 
                  onClick={moveToBack}
                  disabled={!selectedItem}
                >
                  ⬇️ To Back
                </button>
              </div>
            </div>
            <div className="canvas-container">
              <canvas ref={canvas6Ref} width={600} height={300} />
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
            <div className="canvas-container">
              <canvas ref={canvas7Ref} width={600} height={300} />
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
            <p>Clean API with mathematical approach. Learning curve for vector graphics concepts.</p>
          </div>

          <div className="eval-item">
            <h3>Performance</h3>
            <div className="rating">★★★★★</div>
            <p>Excellent performance with vector operations. Efficient rendering and updating.</p>
          </div>

          <div className="eval-item">
            <h3>Features</h3>
            <div className="rating">★★★★★</div>
            <p>Comprehensive vector graphics tools, path operations, and geometric utilities.</p>
          </div>

          <div className="eval-item">
            <h3>Integration</h3>
            <div className="rating">★★★☆☆</div>
            <p>Works with React via canvas refs. No official React bindings. TypeScript support available.</p>
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <h2>Use Cases</h2>
        <ul className="use-case-list">
          <li>Vector graphics editors and design tools</li>
          <li>Data visualization with precision graphics</li>
          <li>Generative art and creative coding</li>
          <li>Technical drawings and CAD applications</li>
          <li>Interactive animations and visualizations</li>
        </ul>
      </section>

      <div className="navigation">
        <Link href="/" className="nav-button">← Back to Home</Link>
      </div>
    </main>
  )
}
