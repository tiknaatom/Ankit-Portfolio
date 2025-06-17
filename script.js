
        // Three.js simple setup for subtle particles
        let scene, camera, renderer, particles;
        let mouseX = 0, mouseY = 0;
        
        function initThreeJS() {
            // Scene setup
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ 
                alpha: true, 
                antialias: true,
                powerPreference: "high-performance"
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);
            document.getElementById('canvas-container').appendChild(renderer.domElement);

            // Create simple particle system
            createSimpleParticles();

            // Camera position
            camera.position.z = 50;

            // Start animation loop
            animate();
        }

        function createSimpleParticles() {
            // Create subtle particles
            const particleCount = 300;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 300;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

                // Blue/cyan color palette
                const color = new THREE.Color();
                color.setHSL(0.6, 0.8, 0.5);
                
                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 2,
                vertexColors: true,
                transparent: true,
                opacity: 0.3,
                blending: THREE.AdditiveBlending
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);
        }

        function animate() {
            requestAnimationFrame(animate);

            const time = Date.now() * 0.001;

            // Simple particle animation
            if (particles) {
                particles.rotation.x += 0.0001;
                particles.rotation.y += 0.0002;
            }

            // Mouse-responsive camera
            camera.position.x += (mouseX * 0.02 - camera.position.x) * 0.01;
            camera.position.y += (-mouseY * 0.02 - camera.position.y) * 0.01;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        // Enhanced mouse interaction
        function onMouseMove(event) {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        }

        // Smooth scrolling and navigation
        function smoothScroll(target) {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

        // Scroll animations
        function animateOnScroll() {
            const elements = document.querySelectorAll('.animate-on-scroll');
            const windowHeight = window.innerHeight;

            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('animated');
                }
            });
        }

        // Navigation active state
        function updateActiveNav() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop <= 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        // Initialize everything
        document.addEventListener('DOMContentLoaded', function() {
            initThreeJS();
            initCodeBackground();
            
            // Navigation setup
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = this.getAttribute('href');
                    smoothScroll(target);
                });
            });

            // Scroll events
            window.addEventListener('scroll', function() {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(10, 14, 23, 0.98)';
                } else {
                    navbar.style.background = 'rgba(10, 14, 23, 0.95)';
                }
                
                animateOnScroll();
                updateActiveNav();
            });

            // Initial animation check
            animateOnScroll();
        });

        function initCodeBackground() {
            const codeLines = [
                'function initServiceNow() {',
                '    var gr = new GlideRecord("incident");',
                '    gr.addQuery("active", true);',
                '    gr.query();',
                '    while (gr.next()) {',
                '        gs.log("Processing: " + gr.number);',
                '    }',
                '}',
                '',
                'class TechnicalAnalyst {',
                '    constructor(name, skills) {',
                '        this.name = name;',
                '        this.skills = skills;',
                '        this.experience = "2+ years";',
                '    }',
                '',
                '    automateProcess(workflow) {',
                '        return workflow.createFlowDesigner();',
                '    }',
                '',
                '    manageITSM() {',
                '        const catalog = new ServiceCatalog();',
                '        return catalog.deploy();',
                '    }',
                '}',
                '',
                'const analyst = new TechnicalAnalyst("Ankit", [',
                '    "ServiceNow", "JavaScript", "Flow Designer"',
                ']);',
                '',
                '// Business Rules Implementation',
                '(function executeRule(current, previous) {',
                '    if (current.state == "Resolved") {',
                '        current.resolved_at = new GlideDateTime();',
                '        gs.addInfoMessage("Incident resolved");',
                '    }',
                '})(current, previous);',
                '',
                'function createCustomCatalog() {',
                '    var catalogItem = {',
                '        name: "Legal Process Automation",',
                '        category: "Kirkland & Ellis",',
                '        workflow: "automated_legal_flow",',
                '        approval: "required"',
                '    };',
                '    return catalogItem;',
                '}',
                '',
                '// Client Script for Form Validation',
                'function onLoad() {',
                '    g_form.setMandatory("priority", true);',
                '    g_form.setDisplay("assignment_group", false);',
                '}',
                '',
                'SELECT * FROM sys_user WHERE active = true',
                'AND department = "IT Services"',
                'ORDER BY last_login_time DESC;',
                '',
                'import { FlowDesigner } from "servicenow";',
                '',
                'const workflowConfig = {',
                '    trigger: "catalog_request",',
                '    actions: ["approve", "fulfill", "notify"],',
                '    conditions: ["role_check", "budget_approval"]',
                '};',
                '',
                '// ACL Security Implementation',
                'var hasRole = gs.hasRole("admin") ||',
                '             gs.hasRole("itil");',
                '',
                'if (hasRole && current.canWrite()) {',
                '    answer = true;',
                '} else {',
                '    answer = false;',
                '}',
                '',
                'function generateReport() {',
                '    const analytics = new GlideAggregate("incident");',
                '    analytics.addAggregate("COUNT");',
                '    analytics.groupBy("category");',
                '    analytics.query();',
                '    return analytics.getResults();',
                '}',
                '',
                '// UI Policy for Dynamic Forms',
                'if (g_form.getValue("category") == "hardware") {',
                '    g_form.setMandatory("ci", true);',
                '    g_form.showFieldMsg("ci", "Required for hardware issues");',
                '}',
            ];

            const codeContainer = document.getElementById('code-bg');
            let fullCode = '';
            
            // Repeat the code multiple times to ensure continuous scrolling
            for (let i = 0; i < 5; i++) {
                fullCode += codeLines.join('\n') + '\n\n';
            }
            
            codeContainer.textContent = fullCode;
        }

        // Event listeners
        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        window.addEventListener('mousemove', onMouseMove);

        // Performance optimization
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(animate);
                ticking = true;
            }
        }
    