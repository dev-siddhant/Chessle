/**
 * Chesssle Academy Website Script
 * Author: AI Developer
 * Date: 2025-05-23
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize theme toggler
    initThemeToggle();
    
    // Initialize particle.js for background animation
    initParticles();
    
    // Initialize filters for courses and gallery
    initFilters();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize chess board easter egg
    initChessboardEasterEgg();
});

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            if (menuToggle.classList.contains('active')) {
                menuToggle.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
                menuToggle.querySelector('span:nth-child(2)').style.opacity = '0';
                menuToggle.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                menuToggle.querySelector('span:nth-child(1)').style.transform = 'none';
                menuToggle.querySelector('span:nth-child(2)').style.opacity = '1';
                menuToggle.querySelector('span:nth-child(3)').style.transform = 'none';
            }
        });
    }
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    menuToggle.click();
                }
            }
        });
    });
}

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const lightModeIcon = document.getElementById('light-mode-icon');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        lightModeIcon.classList.remove('hidden');
        darkModeIcon.classList.add('hidden');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        lightModeIcon.classList.toggle('hidden');
        darkModeIcon.classList.toggle('hidden');
        
        // Save theme preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

/**
 * Initialize particles.js for hero background
 */
function initParticles() {
    if (window.particlesJS && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

/**
 * Initialize filters for courses and gallery
 */
function initFilters() {
    // Courses filters
    initFilter('.course-filters .filter-btn', '.course-card');
    
    // Gallery filters
    initFilter('.gallery-filters .filter-btn', '.gallery-item');
}

/**
 * Initialize filter functionality
 * @param {string} filterSelector - CSS selector for filter buttons
 * @param {string} itemSelector - CSS selector for filterable items
 */
function initFilter(filterSelector, itemSelector) {
    const filterBtns = document.querySelectorAll(filterSelector);
    const items = document.querySelectorAll(itemSelector);
    
    if (filterBtns.length && items.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                items.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.querySelector('.form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            let isValid = true;
            
            // Validate name
            const nameInput = document.getElementById('name');
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim().length < 10) {
                showError(messageInput, 'Please enter a message (at least 10 characters)');
                isValid = false;
            }
            
            if (isValid) {
                // Display success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Reset form for actual submission
                setTimeout(() => {
                    contactForm.submit();
                }, 1000);
            }
        });
    }
}

/**
 * Show error message for form validation
 * @param {HTMLElement} input - Input element with error
 * @param {string} message - Error message to display
 */
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    input.classList.add('error');
    input.focus();
}

/**
 * Initialize chess board easter egg
 */
function initChessboardEasterEgg() {
    const chessboardContainer = document.getElementById('chessboardEasterEgg');
    const chessboard = document.getElementById('chessboard');
    const closeButton = document.getElementById('closeChessboard');
    
    if (!chessboardContainer || !chessboard) return;
    
    // Create chess board easter egg that appears when typing "chess"
    let keySequence = [];
    const targetSequence = ['c', 'h', 'e', 's', 's'];
    
    document.addEventListener('keydown', (e) => {
        // Get the pressed key
        const key = e.key.toLowerCase();
        
        // Add the key to the sequence
        keySequence.push(key);
        
        // Keep only the last 5 keys
        if (keySequence.length > 5) {
            keySequence.shift();
        }
        
        // Check if the sequence matches
        const isMatch = keySequence.join('') === targetSequence.join('');
        
        if (isMatch) {
            // Show the chessboard
            chessboardContainer.style.display = 'block';
            setTimeout(() => {
                chessboardContainer.style.opacity = '1';
            }, 10);
            
            // Initialize the chess board if it hasn't been done
            if (!chessboard.hasChildNodes()) {
                createChessBoard();
            }
        }
    });
    
    // Close button functionality
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            chessboardContainer.style.opacity = '0';
            setTimeout(() => {
                chessboardContainer.style.display = 'none';
            }, 300);
        });
    }
    
    /**
     * Create the chess board with pieces
     */
    function createChessBoard() {
        const pieces = {
            'white': {
                'pawn': '♙',
                'rook': '♖',
                'knight': '♘',
                'bishop': '♗',
                'queen': '♕',
                'king': '♔'
            },
            'black': {
                'pawn': '♟',
                'rook': '♜',
                'knight': '♞',
                'bishop': '♝',
                'queen': '♛',
                'king': '♚'
            }
        };
        
        // Create 8x8 board
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = 'chess-square';
                
                // Add colors
                if ((row + col) % 2 === 0) {
                    square.classList.add('light');
                } else {
                    square.classList.add('dark');
                }
                
                // Set position data attributes
                square.setAttribute('data-row', row);
                square.setAttribute('data-col', col);
                
                // Add pieces
                let piece = null;
                
                if (row === 1) {
                    // Black pawns
                    piece = createPiece(pieces.black.pawn, 'black', 'pawn');
                } else if (row === 6) {
                    // White pawns
                    piece = createPiece(pieces.white.pawn, 'white', 'pawn');
                } else if (row === 0) {
                    // Black pieces
                    if (col === 0 || col === 7) {
                        piece = createPiece(pieces.black.rook, 'black', 'rook');
                    } else if (col === 1 || col === 6) {
                        piece = createPiece(pieces.black.knight, 'black', 'knight');
                    } else if (col === 2 || col === 5) {
                        piece = createPiece(pieces.black.bishop, 'black', 'bishop');
                    } else if (col === 3) {
                        piece = createPiece(pieces.black.queen, 'black', 'queen');
                    } else if (col === 4) {
                        piece = createPiece(pieces.black.king, 'black', 'king');
                    }
                } else if (row === 7) {
                    // White pieces
                    if (col === 0 || col === 7) {
                        piece = createPiece(pieces.white.rook, 'white', 'rook');
                    } else if (col === 1 || col === 6) {
                        piece = createPiece(pieces.white.knight, 'white', 'knight');
                    } else if (col === 2 || col === 5) {
                        piece = createPiece(pieces.white.bishop, 'white', 'bishop');
                    } else if (col === 3) {
                        piece = createPiece(pieces.white.queen, 'white', 'queen');
                    } else if (col === 4) {
                        piece = createPiece(pieces.white.king, 'white', 'king');
                    }
                }
                
                if (piece) {
                    square.appendChild(piece);
                    enableDragAndDrop(piece, square);
                }
                
                chessboard.appendChild(square);
            }
        }
    }
    
    /**
     * Create a chess piece element
     * @param {string} symbol - Unicode symbol for the piece
     * @param {string} color - Color of the piece (white/black)
     * @param {string} type - Type of the piece (pawn, rook, etc.)
     * @returns {HTMLElement} - The created piece element
     */
    function createPiece(symbol, color, type) {
        const piece = document.createElement('div');
        piece.className = `chess-piece ${color} ${type}`;
        piece.textContent = symbol;
        piece.setAttribute('draggable', 'true');
        piece.setAttribute('data-color', color);
        piece.setAttribute('data-type', type);
        return piece;
    }
    
    /**
     * Enable drag and drop for chess pieces
     * @param {HTMLElement} piece - The piece element
     * @param {HTMLElement} square - The square element containing the piece
     */
    function enableDragAndDrop(piece, square) {
        piece.addEventListener('dragstart', handleDragStart);
        
        // Add event listeners to all squares
        const allSquares = chessboard.querySelectorAll('.chess-square');
        
        allSquares.forEach(sq => {
            sq.addEventListener('dragover', handleDragOver);
            sq.addEventListener('drop', handleDrop);
        });
    }
    
    /**
     * Handle the drag start event
     * @param {DragEvent} e - The drag event
     */
    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.parentNode.getAttribute('data-row') + ',' + 
                                          e.target.parentNode.getAttribute('data-col'));
        setTimeout(() => {
            e.target.classList.add('dragging');
        }, 0);
    }
    
    /**
     * Handle the drag over event
     * @param {DragEvent} e - The drag event
     */
    function handleDragOver(e) {
        e.preventDefault();
    }
    
    /**
     * Handle the drop event
     * @param {DragEvent} e - The drag event
     */
    function handleDrop(e) {
        e.preventDefault();
        
        const data = e.dataTransfer.getData('text/plain').split(',');
        const fromRow = parseInt(data[0]);
        const fromCol = parseInt(data[1]);
        
        const toRow = parseInt(e.currentTarget.getAttribute('data-row'));
        const toCol = parseInt(e.currentTarget.getAttribute('data-col'));
        
        // Find the source square and piece
        const sourceSquare = chessboard.querySelector(`.chess-square[data-row="${fromRow}"][data-col="${fromCol}"]`);
        const piece = sourceSquare.querySelector('.chess-piece');
        
        if (piece) {
            // Remove 'dragging' class
            piece.classList.remove('dragging');
            
            // If target square has a piece already, remove it (capture)
            if (e.currentTarget.querySelector('.chess-piece')) {
                e.currentTarget.innerHTML = '';
            }
            
            // Move the piece to the target square
            e.currentTarget.appendChild(piece);
        }
    }
}
