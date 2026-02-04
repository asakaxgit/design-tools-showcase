'use client'

import { Stage, Layer, Rect, Circle, Star, Text } from 'react-konva'
import { useState } from 'react'
import Link from 'next/link'

export default function KonvaShowcase() {
  const [rectColor, setRectColor] = useState('#4299e1')
  const [circlePos, setCirclePos] = useState({ x: 100, y: 200 })
  const [starRotation, setStarRotation] = useState(0)

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
                  onClick={() => setStarRotation(starRotation + 45)}
                />
              </Layer>
            </Stage>
          </div>
          <p className="example-note">Current rotation: {starRotation}°</p>
        </div>

        <div className="example">
          <h3>4. Text Rendering</h3>
          <p>Konva supports text rendering with various styling options</p>
          <div className="canvas-container">
            <Stage width={600} height={200}>
              <Layer>
                <Text
                  text="Hello from Konva!"
                  x={50}
                  y={50}
                  fontSize={32}
                  fontFamily="Arial"
                  fill="#2d3748"
                />
                <Text
                  text="Styled and positioned text"
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
