// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWorkflowAnimations();
    setupIntersectionObserver();
    setupHoverEffects();
    setupCTAButton();
});

// Initialize Workflow Animations
function initializeWorkflowAnimations() {
    const steps = document.querySelectorAll('.workflow-step');
    
    // Add entrance animations with staggered delay
    steps.forEach((step, index) => {
        step.style.animationDelay = `${0.8 + (index * 0.2)}s`;
    });
    
    // Add floating animation to icons
    const icons = document.querySelectorAll('.step-icon');
    icons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.animation = 'float 3s ease-in-out infinite';
            icon.style.animationDelay = `${index * 0.5}s`;
        }, 2000);
    });
}

// Intersection Observer for scroll animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger step counter animation
                const stepNumber = entry.target.querySelector('.step-number');
                if (stepNumber) {
                    animateCounter(stepNumber);
                }
            }
        });
    }, observerOptions);
    
    // Observe all workflow steps
    document.querySelectorAll('.workflow-step').forEach(step => {
        observer.observe(step);
    });
}

// Setup hover effects
function setupHoverEffects() {
    const stepCards = document.querySelectorAll('.step-card');
    
    stepCards.forEach(card => {
        // Mouse enter effect
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            createRippleEffect(this, event);
            
            // Animate icon
            const icon = this.querySelector('.step-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
            
            // Glow effect
            const glow = this.querySelector('.step-glow');
            if (glow) {
                glow.style.opacity = '1';
            }
            
            // Animate other cards
            stepCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.opacity = '0.7';
                    otherCard.style.transform = 'scale(0.95)';
                }
            });
        });
        
        // Mouse leave effect
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.step-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            const glow = this.querySelector('.step-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
            
            // Reset other cards
            stepCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
                otherCard.style.transform = 'scale(1)';
            });
        });
        
        // Click effect
        card.addEventListener('click', function() {
            // Add pulse animation
            this.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
            
            // Show success message (optional)
            showStepDetails(this);
        });
    });
}

// Create ripple effect
function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Animate counter
function animateCounter(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 20;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toString().padStart(2, '0');
    }, 50);
}

// Show step details (optional feature)
function showStepDetails(card) {
    const stepTitle = card.querySelector('.step-title').textContent;
    const stepDescription = card.querySelector('.step-description').textContent;
    
    // Create modal or tooltip (simplified version)
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #3B82F6, #1E40AF);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notification.innerHTML = `
        <strong>${stepTitle}</strong>
        <p style="margin: 5px 0 0 0; font-size: 0.9rem; opacity: 0.9;">
            Click to learn more about this step
        </p>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Setup CTA Button
function setupCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            this.disabled = true;
            
            // Simulate loading
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                this.style.background = 'linear-gradient(135deg, #10B981, #059669)';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    this.style.background = 'linear-gradient(135deg, #F97316, #EAB308)';
                }, 2000);
            }, 1500);
        });
        
        // Add particle effect on hover
        ctaButton.addEventListener('mouseenter', function() {
            createParticles(this);
        });
    }
}

// Create particle effect
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #F97316;
            border-radius: 50%;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = (i * 60) * Math.PI / 180;
        const distance = 50 + Math.random() * 30;
        const duration = 800 + Math.random() * 400;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// Add floating animation keyframes
const floatingKeyframes = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
`;

// Inject keyframes
const style = document.createElement('style');
style.textContent = floatingKeyframes;
document.head.appendChild(style);

// Smooth scrolling for any internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll-based parallax effect
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.step-icon');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}, 16)); // ~60fps